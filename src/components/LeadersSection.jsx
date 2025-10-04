import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { leaders } from "../data/leaders";
import AvatarFallback from "./AvatarFallback";

// Tabs for filtering
const ROLE_TABS = [
  { key: "all", label: "All" },
  { key: "elder", label: "Elders" },
  { key: "deacon", label: "Deacons" },
];

// Utility: escape user query for regex
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Highlight helper returns array of strings / <mark>
function highlight(text = "", query) {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${escapeRegex(query)})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className='bg-yellow-200 text-gray-900 px-0.5 rounded'>
        {part}
      </mark>
    ) : (
      part
    )
  );
}

// Social icon minimal placeholders (could be swapped for SVGs later)
const SocialIcon = ({ type }) => {
  const base = "inline-block w-4 h-4";
  switch (type) {
    case "email":
      return (
        <span aria-hidden='true' className={base}>
          ✉️
        </span>
      );
    case "linkedin":
      return (
        <span aria-hidden='true' className={base}>
          in
        </span>
      );
    case "facebook":
      return (
        <span aria-hidden='true' className={base}>
          f
        </span>
      );
    case "twitter":
      return (
        <span aria-hidden='true' className={base}>
          𝕏
        </span>
      );
    default:
      return null;
  }
};

// Card Component
function LeaderCard({ leader, onOpen, query }) {
  const { name, title, bio, photo, roleType, links } = leader;
  const imgRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Lazy load image
  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "150px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <button
      onClick={() => onOpen(leader)}
      className='text-left bg-white rounded-xl shadow hover:shadow-lg transition-shadow duration-200 overflow-hidden border border-gray-100 flex flex-col focus:outline-none focus:ring-2 focus:ring-blue-500'
    >
      <div
        ref={imgRef}
        className='aspect-square w-full bg-gray-100 flex items-center justify-center overflow-hidden relative'
      >
        {photo && !error ? (
          inView && (
            <img
              src={photo}
              alt={name}
              className={`w-full h-full object-cover transition duration-700 ${
                loaded ? "blur-0 opacity-100" : "blur-md scale-105 opacity-0"
              }`}
              onLoad={() => setLoaded(true)}
              onError={() => setError(true)}
              loading='lazy'
            />
          )
        ) : (
          <AvatarFallback name={name} />
        )}
        {!loaded && photo && !error && (
          <div className='absolute inset-0 flex items-center justify-center text-gray-300 text-4xl'>
            ⏳
          </div>
        )}
      </div>
      <div className='p-5 flex flex-col flex-1'>
        <span className='text-xs uppercase tracking-wide text-blue-600 font-semibold mb-1'>
          {roleType}
        </span>
        <h3 className='text-lg font-bold text-gray-900'>
          {highlight(name, query)}
        </h3>
        {title && (
          <p className='text-sm text-gray-600 mb-3'>
            {highlight(title, query)}
          </p>
        )}
        <p className='text-sm text-gray-700 leading-relaxed line-clamp-4'>
          {highlight(bio, query)}
        </p>
        {links && (
          <div className='flex gap-3 mt-3 flex-wrap'>
            {Object.entries(links).map(([k, v]) => (
              <a
                key={k}
                href={k === "email" ? `mailto:${v}` : v}
                aria-label={`${name} ${k}`}
                onClick={(e) => e.stopPropagation()}
                target={k === "email" ? undefined : "_blank"}
                rel={k === "email" ? undefined : "noopener noreferrer"}
                className='text-gray-500 hover:text-blue-600 transition-colors text-sm inline-flex items-center gap-1'
              >
                <SocialIcon type={k} />
                <span className='sr-only'>{k}</span>
              </a>
            ))}
          </div>
        )}
        <span className='mt-4 text-sm text-blue-600 font-medium inline-flex items-center'>
          Read more →
        </span>
      </div>
    </button>
  );
}

// Modal component with focus trap + scroll lock
function LeaderModal({ leader, onClose, query }) {
  const dialogRef = useRef(null);
  const previouslyFocused = useRef(null);

  useEffect(() => {
    previouslyFocused.current = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus first focusable
    const focusables = dialogRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusables && focusables[0]?.focus();

    return () => {
      document.body.style.overflow = prevOverflow;
      if (previouslyFocused.current && previouslyFocused.current.focus) {
        previouslyFocused.current.focus();
      }
    };
  }, []);

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
      return;
    }
    if (e.key === "Tab") {
      const list = dialogRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!list || list.length === 0) return;
      const arr = Array.from(list);
      const idx = arr.indexOf(document.activeElement);
      if (e.shiftKey && idx === 0) {
        e.preventDefault();
        arr[arr.length - 1].focus();
      } else if (!e.shiftKey && idx === arr.length - 1) {
        e.preventDefault();
        arr[0].focus();
      }
    }
  };

  return (
    <div
      role='dialog'
      aria-modal='true'
      aria-label={`${leader.name} details`}
      className='fixed inset-0 z-50 flex items-center justify-center p-4'
      onKeyDown={onKeyDown}
    >
      <div
        className='absolute inset-0 bg-black/50 backdrop-blur-sm'
        onClick={onClose}
        aria-hidden='true'
      />
      <div
        ref={dialogRef}
        className='relative bg-white rounded-xl shadow-xl max-w-xl w-full overflow-hidden animate-fade-in'
      >
        <div className='flex flex-col md:flex-row'>
          <div className='md:w-1/3 bg-gray-100 aspect-square flex items-center justify-center overflow-hidden'>
            {leader.photo ? (
              <img
                src={leader.photo}
                alt={leader.name}
                className='w-full h-full object-cover'
              />
            ) : (
              <AvatarFallback name={leader.name} />
            )}
          </div>
          <div className='md:w-2/3 p-6 relative'>
            <button
              onClick={onClose}
              className='absolute top-3 right-3 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded'
              aria-label='Close modal'
            >
              ✕
            </button>
            <span className='text-xs uppercase tracking-wide text-blue-600 font-semibold mb-1 block'>
              {leader.roleType}
            </span>
            <h3 className='text-2xl font-bold text-gray-900'>
              {highlight(leader.name, query)}
            </h3>
            {leader.title && (
              <p className='text-sm text-gray-600 mb-4'>
                {highlight(leader.title, query)}
              </p>
            )}
            <p className='text-sm text-gray-700 leading-relaxed whitespace-pre-line mb-4'>
              {highlight(leader.bio, query)}
            </p>
            {leader.links && (
              <div className='flex gap-4 flex-wrap'>
                {Object.entries(leader.links).map(([k, v]) => (
                  <a
                    key={k}
                    href={k === "email" ? `mailto:${v}` : v}
                    className='text-sm text-blue-600 hover:underline inline-flex items-center gap-1'
                    target={k === "email" ? undefined : "_blank"}
                    rel={k === "email" ? undefined : "noopener noreferrer"}
                  >
                    <SocialIcon type={k} /> {k}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LeadersSection() {
  const [activeRole, setActiveRole] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const tabsRef = useRef([]);

  const closeModal = useCallback(() => setSelected(null), []);

  // Global escape key
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") closeModal();
    };
    if (selected) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selected, closeModal]);

  // Precompute counts once
  const counts = useMemo(
    () => ({
      all: leaders.length,
      elder: leaders.filter((l) => l.roleType === "elder").length,
      deacon: leaders.filter((l) => l.roleType === "deacon").length,
    }),
    []
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let base =
      activeRole === "all"
        ? leaders
        : leaders.filter((l) => l.roleType === activeRole);
    if (q) {
      base = base.filter((l) =>
        [l.name, l.title, l.bio].some((f) => f?.toLowerCase().includes(q))
      );
    }
    const rolePriority = { elder: 0, deacon: 1 };
    return [...base].sort((a, b) => {
      const rp =
        (rolePriority[a.roleType] ?? 99) - (rolePriority[b.roleType] ?? 99);
      if (rp !== 0) return rp;
      const orderDiff = (a.order ?? 999) - (b.order ?? 999);
      if (orderDiff !== 0) return orderDiff;
      return a.name.localeCompare(b.name);
    });
  }, [activeRole, search]);

  return (
    <section className='py-16 lg:py-24 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-gray-900'>
            Church Leadership
          </h2>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            Meet the elders and deacons who serve our congregation through
            teaching, shepherding, prayer, and practical care.
          </p>
        </div>

        <div className='flex justify-center mb-6 gap-2 flex-wrap'>
          <div
            role='tablist'
            aria-label='Leader role filters'
            className='flex gap-2 flex-wrap justify-center'
          >
            {ROLE_TABS.map((tab, idx) => (
              <button
                key={tab.key}
                ref={(el) => (tabsRef.current[idx] = el)}
                role='tab'
                aria-selected={activeRole === tab.key}
                tabIndex={activeRole === tab.key ? 0 : -1}
                onClick={() => setActiveRole(tab.key)}
                onKeyDown={(e) => {
                  if (["ArrowRight", "ArrowLeft"].includes(e.key)) {
                    e.preventDefault();
                    const dir = e.key === "ArrowRight" ? 1 : -1;
                    let next =
                      (idx + dir + ROLE_TABS.length) % ROLE_TABS.length;
                    tabsRef.current[next]?.focus();
                    setActiveRole(ROLE_TABS[next].key);
                  }
                }}
                className={`px-5 py-2 rounded-full text-sm font-medium border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  activeRole === tab.key
                    ? "bg-blue-600 text-white border-blue-600 shadow"
                    : "bg-white text-gray-700 hover:bg-blue-50 border-gray-300"
                }`}
              >
                {tab.label} ({counts[tab.key]})
              </button>
            ))}
          </div>
        </div>

        <div className='max-w-md mx-auto mb-10'>
          <input
            type='text'
            placeholder='Search leaders...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            aria-label='Search leaders'
            aria-describedby='leaders-search-hint'
          />
          <p id='leaders-search-hint' className='sr-only'>
            Search by name, title, or biography text.
          </p>
        </div>

        <div
          className='grid sm:grid-cols-2 lg:grid-cols-3 gap-8'
          aria-live='polite'
          aria-label='Leaders results'
        >
          {filtered.map((l) => (
            <LeaderCard
              key={l.id}
              leader={l}
              onOpen={setSelected}
              query={search.trim()}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className='text-center text-gray-600 mt-12'>
            No leaders found.
          </div>
        )}
      </div>
      {selected && (
        <LeaderModal
          leader={selected}
          onClose={closeModal}
          query={search.trim()}
        />
      )}
    </section>
  );
}
