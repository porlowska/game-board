import { GoHomeFill } from "react-icons/go";
import { Outlet, Link } from "react-router-dom";
import { GiTicTacToe } from "react-icons/gi";
import { LuWholeWord } from "react-icons/lu";
import { VscSnake } from "react-icons/vsc";

const navigation = [
  { name: "Home", href: "/", icon: GoHomeFill, current: false },
  {
    name: "Tic Tac Toe",
    href: "/tic-tac-toe",
    icon: GiTicTacToe,
    current: false,
  },
  { name: "Wordle", href: "/wordle", icon: LuWholeWord, current: false },
  { name: "Snake", href: "/snake", icon: VscSnake, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const NavigationElements = () => {
  return (
    <ul role="list" className="-mx-2 space-y-1">
      {navigation.map((item) => (
        <li key={item.name}>
          <Link
            to={item.href}
            className={classNames(
              item.current
                ? "bg-gray-800 text-white"
                : "text-gray-400 hover:bg-gray-800 hover:text-white",
              "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
            )}
          >
            <item.icon aria-hidden="true" className="h-6 w-6 shrink-0" />
            {item.name}
          </Link>
        </li>
      ))}
      <Outlet />
    </ul>
  );
};
