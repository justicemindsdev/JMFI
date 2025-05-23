import { Header } from "../components/Header";

export default function AppPage() {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex-grow">
                <iframe
                    src="https://officalofficer.vercel.app"
                    className="w-full h-full border-0"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
}
