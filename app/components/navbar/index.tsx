import { Form, Link } from "@remix-run/react";
import { useOptionalUser } from "~/utils";
import { useState } from "react";
import venom from "~/assets/png/venom.png";
import NavbarLink from "./NavbarLink";
import { Menu } from 'react-feather';

const Navbar = () => {
   const [isOpen, setIsOpen] = useState(false);
   const user = useOptionalUser();
   console.log({ user });

    return (
      <header className="bg-gray-900 md:flex md:justify-between">
        <div className="flex items-center justify-between px-4 py-3">
          <div> 
            <img className= "h-16 w-auto" src={venom} alt="Dobu Martial Arts Gym"/>
          </div>
          <div className="md:hidden">
            <button
              className="block text-gray-500 hover:text-white focus:text-white focus:outline-none "
              type="button"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu />
            </button>
          </div>
        </div>
        <div className={`px-2 pt-2 pb-4 ${
          isOpen ? "block" : "hidden"
          } md:flex md:items-center`}>
          <NavbarLink url="/">Home</NavbarLink>
          <NavbarLink url="/about">About Us</NavbarLink>
          <NavbarLink url="/Classes">Classes</NavbarLink>
          <NavbarLink url="/memberships">Membership</NavbarLink>

        {user ? (
          <Form action="/logout" method="post">
            <button
              type="submit"
              className="mt-4 rounded border-2 border-slate-700 bg-slate-600 px-4 py-2 text-blue-100 hover:bg-blue-500 active:bg-blue-600 lg:mt-0 lg:ml-4"
            >
              Logout
            </button>
          </Form>
        ) : (
          <Link
            to="/login"
            type="button"
            className="mt-4 rounded border-2 border-neutral-700 bg-neutral-300 px-4 py-2 text-neutral-900 transition-colors hover:bg-neutral-100 lg:mt-0 lg:ml-4"
          >
            Login
          </Link>
        )}
          </div>
      </header>
    );
  };
  
  export default Navbar; 