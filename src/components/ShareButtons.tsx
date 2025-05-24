import { useCallback } from "react";
import { 
  FaTwitter, 
  FaFacebookF, 
  FaLinkedinIn, 
  FaEnvelope, 
  FaLink 
} from "react-icons/fa";
import { useToast } from "../hooks/use-toast";

interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const { toast } = useToast();
  
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  
  const socialLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`
  };
  
  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(url)
      .then(() => {
        toast({
          title: "Link copied",
          description: "Link has been copied to clipboard",
          duration: 2000,
        });
      })
      .catch(err => {
        toast({
          title: "Failed to copy",
          description: "Could not copy link to clipboard",
          variant: "destructive",
        });
        console.error("Failed to copy link: ", err);
      });
  }, [url, toast]);
  
  return (
    <div className="border-t border-b border-gray-800 py-6 my-10 bg-gray-900 bg-opacity-50 rounded-lg p-6">
      <h4 className="text-lg font-semibold mb-4 text-white">Share this article</h4>
      <div className="flex space-x-4">
        <a 
          href={socialLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="social-share-button bg-[#1DA1F2] text-white p-3 rounded-full hover:-translate-y-1 transition-transform hover:shadow-lg hover:shadow-[#1DA1F2]/20"
          aria-label="Share on Twitter"
        >
          <FaTwitter />
        </a>
        {/* <a 
          href={socialLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="social-share-button bg-[#4267B2] text-white p-3 rounded-full hover:-translate-y-1 transition-transform hover:shadow-lg hover:shadow-[#4267B2]/20"
          aria-label="Share on Facebook"
        >
          <FaFacebookF />
        </a> */}
        <a 
          href={socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer" 
          className="social-share-button bg-[#0077B5] text-white p-3 rounded-full hover:-translate-y-1 transition-transform hover:shadow-lg hover:shadow-[#0077B5]/20"
          aria-label="Share on LinkedIn"
        >
          <FaLinkedinIn />
        </a>
        <a 
          href={socialLinks.email}
          className="social-share-button bg-gray-700 text-white p-3 rounded-full hover:-translate-y-1 transition-transform hover:shadow-lg hover:shadow-gray-700/20"
          aria-label="Share via Email"
        >
          <FaEnvelope />
        </a>
        {/* <button 
          onClick={copyToClipboard}
          className="social-share-button bg-primary text-white p-3 rounded-full hover:-translate-y-1 transition-transform hover:shadow-lg hover:shadow-primary/20"
          aria-label="Copy link"
        >
          <FaLink />
        </button> */}
      </div>
    </div>
  );
}
