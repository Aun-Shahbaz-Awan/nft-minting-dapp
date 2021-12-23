const Footer = () => {
  return (
    <div className=" bg-secondary m-3 rounded-lg p-4">
      <div className="flex items-center justify-center">
        <p className="font-medium text-white ">
          <span className="md:hidden">
            Product of{" "}
            <a href="https://www.thekaizenglobal.com/" className="text-primary">
              Kaizen Global
            </a>
          </span>
          <span className="hidden md:inline">
            Product of{" "}
            <a href="https://www.thekaizenglobal.com/" className="text-primary">
              Kaizen Global&nbsp;
            </a>
            - Website under Development.
          </span>
        </p>
      </div>
    </div>
  );
};
export default Footer;
