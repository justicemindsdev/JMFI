import { Header } from "../components/Header";

export default function Substantiation() {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex-grow">
                <iframe
                    src="/files/substantiation.html"
                    className="w-full h-full border-0"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
}
