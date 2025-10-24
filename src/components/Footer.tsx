import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  
  return (
	<footer className="bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 text-pink-500 py-8 mt-12 font-[Fredoka,Comic Sans MS,Arial Rounded,sans-serif] border-t-4 border-pink-200">
		<div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
			{/* Logo */}
			<div>
				<h2 className="text-2xl font-extrabold mb-2 drop-shadow">
					<span className="text-pink-500">Dyslexia</span>
					<span className="text-yellow-500">Care</span>
				</h2>
				<p className="text-base mt-2 opacity-90">
					{t('footer.description')}
				</p>
			</div>

			{/* Các liên kết hữu ích */}
			<div>
				<h3 className="text-lg font-bold mb-2 text-pink-400">
					{t('footer.links.title')}
				</h3>
				<ul className="space-y-1">
					<li>
						<a href="#" className="hover:underline transition">
							{t('footer.links.home')}
						</a>
					</li>
					<li>
						<a href="#" className="hover:underline transition">
							{t('footer.links.about')}
						</a>
					</li>
					<li>
						<a href="#" className="hover:underline transition">
							{t('footer.links.support')}
						</a>
					</li>
				</ul>
			</div>

			{/* Mạng xã hội */}
			<div>
				<h3 className="text-lg font-bold mb-2 text-pink-400">
					{t('footer.social.title')}
				</h3>
				<ul className="space-y-1">
					<li>
						<a href="#" className="hover:underline transition">
							{t('footer.social.instagram')}
						</a>
					</li>
					<li>
						<a href="#" className="hover:underline transition">
							{t('footer.social.linkedin')}
						</a>
					</li>
					<li>
						<a href="#" className="hover:underline transition">
							{t('footer.social.twitter')}
						</a>
					</li>
				</ul>
			</div>

			{/* Bản tin */}
			<div>
				<h3 className="text-lg font-bold mb-2 text-pink-400">
					{t('footer.newsletter.title')}
				</h3>
				<form className="flex flex-col sm:flex-row items-center gap-2">
					<input
						type="email"
						placeholder={t('footer.newsletter.placeholder')}
						className="px-4 py-2 rounded-full text-pink-700 bg-white border border-yellow-300 outline-none w-full sm:w-auto text-base"
					/>
					<button
						type="submit"
						className="bg-pink-500 text-white font-bold px-5 py-2 rounded-full shadow hover:bg-yellow-300 hover:text-pink-700 transition"
					>
						{t('footer.newsletter.button')}
					</button>
				</form>
			</div>
		</div>
		<div className="text-center text-xs mt-8 text-pink-400 opacity-80">
			{t('footer.copyright', { year: new Date().getFullYear() })}
		</div>
	</footer>
  );
};

export default Footer;
