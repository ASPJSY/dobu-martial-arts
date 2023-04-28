import { Link } from "@remix-run/react";

 type NavbarLinkProps = {
     children: React.ReactNode;
     url: string;
 }
const NavbarLink = ({ children, url }: NavbarLinkProps) => {
    return(
        <Link to={url} className="mt-1 block rounded px-2 py-1 front-semibold text-white hover:bg-slate-800 md:ml=2">
            {children}
        </Link>
    );
};

export default NavbarLink;