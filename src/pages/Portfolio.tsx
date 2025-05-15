import { Header } from "../components/Header";

export default function Portfolio() {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex-grow">
                <iframe
                    src="https://new-portfolio-8ectinz77-justiceminds-projects.vercel.app/"
                    className="w-full h-full border-0"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
}
