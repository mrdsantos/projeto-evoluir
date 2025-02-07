export default function Footer() {

    return (
        <div className="bg-base-300 text-base-content">
            <footer className="footer bg-neutral text-neutral-content p-8">
                <nav>
                    <h6 className="footer-title">Services</h6>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Legal</h6>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
            </footer>
        </div>
    );
}
