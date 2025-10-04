// Structured leaders data. Replace photo paths with real images placed in /src/assets or /public.
// roleType: 'elder' | 'deacon'
// Optional links: { email?, linkedin?, facebook?, twitter? }
import dickBickingsImg from "../assets/D_Bickings.png";
import rickPetreccaImg from "../assets/r_petrecca.jpg";
import tomLioyImg from "../assets/t_lioy.jpg";
import georgeKingImg from "../assets/g_king.jpg";
import rogerBishopImg from "../assets/r_bishop.png";
import steveHillriegelImg from "../assets/s_hillriegel.jpg";

export const leaders = [
  {
    id: "elder-1",
    name: "Dick Bickings",
    roleType: "elder",
    title: "Senior Pastor/Elder",
    bio: "Dick has been serving in the local church, for what seems nearly his entire life. He grew up in a pastor's family and gained a love for God's word through the ministry of his dad. Dick worked in the power plant industry for many years and was called into vocational ministry as a pastor in 2009. He retired from vocational ministry in 2020 and moved to Delaware with his wife Donna and now serves in the ministry of New Life.  He currently has come out of retirement and is working as senior Pastor.",
    photo: dickBickingsImg,
    order: 1,
    links: {
      email: "dick.bickings@gmail.com",
    },
  },
  {
    id: "elder-2",
    name: "Rick Petrecca",
    roleType: "elder",
    title: "Elder",
    bio: "Rick has been a member of New Life since 2017 and has been faithfully serving the church as a Sunday School teacher and by helping to oversee much of the care and upkeep of the church facilities. He is married to Pat, who often leads one of our Women's bible studies.",
    photo: rickPetreccaImg,
    order: 2,
    links: {
      email: "richard.petrecca@gmail.com",
    },
  },
  {
    id: "elder-3",
    name: "Tom Lioy",
    roleType: "elder",
    title: "Elder",
    bio: "Tom has been a faithful member of New life since 2014. He serves the church as a Sunday School teacher and occasionally from behind the pulpit on Sunday mornings. Tom is a dedicated shepherd of the church who has a love for people and God's word.",
    photo: tomLioyImg,
    order: 3,
    links: {
      email: "mrq2toml@gmail.com",
    },
  },
  {
    id: "deacon-1",
    name: "George King",
    roleType: "deacon",
    title: "Deacon",
    bio: "George and his wife Marry Ann (Nan) have been part of New Life's ministry from its inception back in 2004. They have been and continue to be faithful servants of Jesus in the church's life.",
    photo: georgeKingImg,
    order: 1,
    links: { email: "nanandgeorge@comcast.net" },
  },
  {
    id: "deacon-2",
    name: "Roger Bishop",
    roleType: "deacon",
    title: "Deacon",
    bio: "Roger and his wife Judy have been with us since 2014.  Roger is meticulous in his duties as a deacon, taking seriously his responsibility to serve the Lord and His people in this way.",
    photo: rogerBishopImg,
    order: 2,
    links: {
      email: "rbishop89vette@gmail.com",
    },
  },
  {
    id: "deacon-3",
    name: "Steve Hillriegel",
    roleType: "deacon",
    title: "Deacon",
    bio: "Steve and his wife Joyce have been members of New Life since 2024. They both serve in various 'helps' ministries and serve the body well. Steve, with his maintenance background, is a faithful servant, and joyfully serves the body in a variety of ways.",
    photo: steveHillriegelImg,
    order: 3,
    links: {
      email: "%20sjh1953@hotmail.com",
    },
  },
];

export function getLeadersByRole(role) {
  if (!role || role === "all") return leaders;
  return leaders.filter((l) => l.roleType === role);
}
