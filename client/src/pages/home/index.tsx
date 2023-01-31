import React from "react";
import GlobalLayout from "@/common/components/GlobalLayout";
import { HomeLayout, HomeNav, HomeContent } from "./components";

function Home() {
  return (
    <GlobalLayout>
      <HomeLayout>
        <HomeNav />
        <HomeContent />
      </HomeLayout>
    </GlobalLayout>
  );
}

export default Home;
