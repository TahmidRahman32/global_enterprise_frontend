export const getInitials = (name: string) =>
   name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

export const avatarColors = ["bg-violet-500/20 text-violet-300", "bg-amber-500/20 text-amber-300", "bg-teal-500/20 text-teal-300", "bg-rose-500/20 text-rose-300", "bg-sky-500/20 text-sky-300"];

export const getAvatarColor = (name: string) => avatarColors[name.charCodeAt(0) % avatarColors.length];
