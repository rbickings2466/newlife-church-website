## Admin & Moderation Guide

This document explains configuration and moderation features for the New Life Church site.

### 1. Environment Configuration

Add the following variables to `.env.local` (never commit real secrets):

```
VITE_YOUTUBE_API_KEY=YOUR_KEY
VITE_YOUTUBE_CHANNEL_ID=YOUR_CHANNEL_ID
VITE_ADMIN_EMAILS=admin1@example.com,admin2@example.com
```

`VITE_ADMIN_EMAILS` is a comma separated list. On a user’s first login:

- If their email is in this list they receive `role: 'admin'` and `vetted: true`.
- Otherwise they receive `role: 'member'` and `vetted: false` (pending vetting).

Restart the dev server after editing `.env.local` so Vite reloads values.

Admin allowlist in Firestore (optional but recommended for existing users):

- We added an allowlist doc at `/config/adminAllowlist` that rules can check.
- Seed it from your `.env.local` using:

```bash
npm run seed:admins
```

This writes a map like `{ emails: { "admin1@example.com": true } }` so an existing user can self-escalate to admin securely on next login.

### 2. Firestore Data Model

Collections:

- `users/{uid}`: `{ email, role, vetted, createdAt }`
- `prayerRequests/{id}`: `{ text, userId, userEmail, createdAt, createdAtMillis, updatedAt, isVetted }`

Denormalizing `isVetted` on each prayer request allows simple rule checks without collection group joins.

### 3. Vetting Workflow

1. Unvetted members can submit prayer requests. Their own requests show only to themselves and admins.
2. Admin vets the user in the Admin panel (`Members` section -> bottom when logged in as admin).
3. Vet toggle sets `users/{uid}.vetted = true` and cascades a batch update of all their existing `prayerRequests` to `isVetted: true` so they become visible to everyone immediately.
4. Unvetting only flips the user flag (existing requests remain vetted; adjust logic if you need a reverse cascade).

### 4. Roles

`admin` capabilities:

- Vet / unvet users
- Promote/demote other users (cannot demote self in UI)
- Delete any prayer request
- Edit (same as owner if needed via Firestore console)

`member` capabilities:

- Create prayer requests (appear immediately only if vetted)
- Edit & delete only their own requests

### 5. Firestore Rules (Summary)

Rules enforce:

- Read prayer requests if (request.isVetted) OR (owner) OR (admin)
- Create requires required fields & consistency
- Owner updates limited to changing `text` and `updatedAt`
- Admin updates can adjust `isVetted` or other moderation fields
- Users collection reads limited to admins or self; admins can update vetted/role

### 6. Leaders Section Accessibility & Enhancements

Features implemented:

- Keyboard-navigable role tabs using Arrow Left/Right (`role=tablist` pattern)
- Search input with hidden descriptive help text
- Search highlighting wraps matches in `<mark>`
- Lazy-loaded leader photos with blur-in transition
- Modal: focus trap, escape key close, scroll lock on body
- Social links: accessible icons with sr-only labels

To add a leader social link, extend an entry in `src/data/leaders.js`:

```js
{
  id: 'jane-doe',
  name: 'Jane Doe',
  roleType: 'elder',
  title: 'Elder',
  bio: 'Short bio...',
  links: { email: 'jane@example.com', linkedin: 'https://linkedin.com/in/janedoe' }
}
```

### 7. YouTube Error Handling

The helper `classifyYouTubeError(error)` in `src/lib/youtube.js` returns `{ type, message }` so UI components can show user-friendly fallbacks (e.g., quota exceeded, misconfiguration). Decorate your UI with this:

```js
try {
  const videos = await youtubeAPI.getChannelVideos();
} catch (e) {
  const info = classifyYouTubeError(e);
  setVideoError(info.message);
}
```

### 8. Future Improvements (Optional)

- Reverse cascade when unvetting (set previous requests back to hidden)
- Admin audit log of vetting events
- Aggregate counts (pending vs vetted) per user without full scan
- Rate limiting prayer submissions per user

---

Last updated: 2025-09-13
