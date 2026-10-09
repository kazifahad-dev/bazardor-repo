export default function Avatar({ user, className = "size-9 rounded-[10px]" }) {
  if (user.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={user.image}
        alt=""
        referrerPolicy="no-referrer"
        className={`${className} object-cover`}
      />
    );
  }

  return (
    <span
      className={`${className} flex items-center justify-center bg-primary font-semibold text-primary-content`}
    >
      {user.name?.charAt(0).toUpperCase()}
    </span>
  );
}