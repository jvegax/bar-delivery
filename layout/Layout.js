import Head from "next/head";
import React from "react";
import Sidebar from "../components/Sidebar";
import CustomModal from "../components/CustomModal";
import Modal from "react-modal";
import useKiosko from "../hooks/useKiosko";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#__next");

const Layout = ({ children, pagina }) => {
  const { modal } = useKiosko();

  return (
    <>
      <Head>
        <title>KioskoApp - {pagina}</title>
        <meta name="description" content="Kiosko app" />
      </Head>
      <div className="md:flex">
        <aside className="md:w-4/12 xl:w-1/4 2xl:w-1/5">
          <Sidebar />
        </aside>
        <main className="md:w-8/12 xl:w-3/4 2xl:w-4/5 h-screen overflow-y-scroll">
          <div className="p-10">{children}</div>
        </main>
      </div>
      {modal && (
        <Modal
          isOpen={modal}
          style={customStyles}
        >
          <CustomModal />
        </Modal>
      )}
    </>
  );
};

export default Layout;
