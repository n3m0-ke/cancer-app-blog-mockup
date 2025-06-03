import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-12 border-t">
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8 text-sm text-gray-600">
        {/* Left Column */}
        <div>
          <h4 className="text-base font-semibold text-gray-800 mb-3">About</h4>
          <p className="mb-2">
            A personal blog sharing thoughts, tutorials, and stories from tech and beyond.
          </p>
        </div>

        {/* Middle Column */}
        <div>
          <h4 className="text-base font-semibold text-gray-800 mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-blue-600">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-600">
                About Me
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-600">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Column */}
        <div>
          <h4 className="text-base font-semibold text-gray-800 mb-3">Stay Connected</h4>
          <p className="mb-2">Follow on social media or reach out via email.</p>
          <div className="flex gap-4 text-lg">
            {/* Icons optional */}
            <a href="mailto:your@email.com" className="hover:text-blue-600">
              Email
            </a>
            <a href="https://twitter.com/yourhandle" className="hover:text-blue-600">
              Twitter
            </a>
            <a href="https://github.com/yourhandle" className="hover:text-blue-600">
              GitHub
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-400 py-4 border-t">
        &copy; {new Date().getFullYear()} Your Blog Name. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
