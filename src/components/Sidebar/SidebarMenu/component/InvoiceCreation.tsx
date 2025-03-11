import { FaFileInvoice } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const InvoiceCreation = () => {
    return (
        <li>
            <NavLink
                to="/invoice-creation"
                className={({ isActive }) =>
                    `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out ${
                        isActive
                            ? 'bg-fuchsia-900 text-white'
                            : 'text-black-2 dark:text-bodydark2 hover:bg-fuchsia-100 hover:text-fuchsia-900 dark:hover:bg-meta-4'
                    }`
                }
            >
                <FaFileInvoice className="fill-current" size={18} />
                Invoice Creation
            </NavLink>
        </li>
    );
};

export default InvoiceCreation;
