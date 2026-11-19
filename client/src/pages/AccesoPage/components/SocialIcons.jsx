const ICONOS = ["devicon-google-plain", "devicon-facebook-plain", "devicon-linkedin-plain", "devicon-github-original"];

export default function SocialIcons() {
  return (
    <div className="social-icons">
      {ICONOS.map((icono) => (
        <a key={icono} href="#" className="icon">
          <i className={`fa-brands ${icono}`}></i>
        </a>
      ))}
    </div>
  );
}