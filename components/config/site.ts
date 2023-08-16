export interface ISiteConfig {
    siteName: string;
    description: string;
    currentlyAt: string;
    socialLinks: {
        twitter: string;
        youtube: string;
        github: string;
        linkedin: string;
        instagram: string;
        facebook: string;
    }
}
const siteConfig: ISiteConfig = {
    siteName: "Explorer",
    description: "Unlock the essence of cities with our Travel Minimal Citiest. Embrace urban beauty through a minimalist lens",
    currentlyAt: "Nicaragua",
    socialLinks: {
        twitter: "https://twitter.com/samyriveratv?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor",
        youtube: "https://www.youtube.com/@Rivers_gg",
        github: "https://github.com/lvanegasimagine",
        linkedin: "https://www.linkedin.com/in/erikgiovani/",
        instagram: "https://www.instagram.com/samyrivera/",
        facebook: "https://www.facebook.com/AyoGamerXD"
    }
}

export default siteConfig;