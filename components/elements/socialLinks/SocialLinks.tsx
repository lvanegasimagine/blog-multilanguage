import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaLinkedinIn, FaGithub } from "react-icons/fa";
import Link from "next/link"

interface ISocialLinks {
    platform: string,
    link: string,
    isShareURL?: boolean
}

const SocialLinks = ({ platform, link, isShareURL = false }: ISocialLinks) => {
    const getIcon = (platform: string) => {
        switch (platform) {
            case 'facebook':
                return <FaFacebook />
            case 'twitter':
                return <FaTwitter />
            case 'instagram':
                return <FaInstagram />
            case 'youtube':
                return <FaYoutube />
            case 'linkedin':
                return <FaLinkedinIn />
            case 'github':
                return <FaGithub />
            default:
                break;
        }
    }

    return (
        <Link href={link}>
            <div className={`${isShareURL ? 'py-2 px-3 bg-neutral-200 rounded-md text-neutral-600 hover:bg-neutral-600 hover:text-neutral-100 duration-100 ease-in-out transition-colors' : ''}`}>{getIcon(platform)}</div>
        </Link>
    )
}
export default SocialLinks