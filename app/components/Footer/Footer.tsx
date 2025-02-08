export default function Footer() {
    return (
        <div className="bg-base-300 text-base-content">
            <footer className="footer bg-neutral text-neutral-content p-8">
                <nav>
                    <h6 className="footer-title">Cursos</h6>
                    <a className="link link-hover">Desenvolvimento Web</a>
                    <a className="link link-hover">Python para Iniciantes</a>
                    <a className="link link-hover">JavaScript Avançado</a>
                    <a className="link link-hover">Banco de Dados</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Empresa</h6>
                    <a className="link link-hover">Sobre Nós</a>
                    <a className="link link-hover">Blog</a>
                    <a className="link link-hover">Trabalhe Conosco</a>
                    <a className="link link-hover">Contato</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Suporte</h6>
                    <a className="link link-hover">FAQ</a>
                    <a className="link link-hover">Central de Ajuda</a>
                    <a className="link link-hover">Política de Privacidade</a>
                    <a className="link link-hover">Termos de Uso</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Siga-nos</h6>
                    <div className="flex flex-col gap-4">
                        <a className="link link-hover">📘 Facebook</a>
                        <a className="link link-hover">📷 Instagram</a>
                        <a className="link link-hover">🐦 Twitter</a>
                        <a className="link link-hover">🎥 YouTube</a>
                    </div>
                </nav>
            </footer>
        </div>
    );
}
