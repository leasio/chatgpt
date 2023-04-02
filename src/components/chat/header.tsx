import React, { useEffect, useState } from "react";
import { PAGES, useAppContext } from "@/context/app";
import { useChatContext } from "@/context/chat";

const Header: React.FC = () => {
  const { setPage } = useAppContext();
  const { model, setModel } = useChatContext();
  const [models, setModels] = useState<{ id: string }[]>([{ id: model }]);

  const getModelList = () => {
    fetch("/api/models", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setModels(data.data ?? []);
      });
  };

  useEffect(() => {
    getModelList();
  }, []);

  return (
    <header className="border-b-2 shadow-inner p-4">
      <div className="flex items-center justify-between">
        <button
          className="text-white min-w-10 h-10 rounded-md px-3 bg-blue-500 focus-visible:outline-none hover:bg-blue-600"
          onClick={() => setPage(PAGES.IMAGES)}
        >
          去找图
        </button>

        <div className="flex items-center space-x-2">
          <div>
            <label>模型：</label>
            <select
              className="h-10 rounded-md px-3 ring-1 ring-inset ring-gray-300 cursor-pointer focus-visible:outline-none hover:ring-blue-400 appearance-none"
              onChange={(e) => setModel(e.target?.value)}
              value={model}
            >
              {models.map((model) => {
                return (
                  <option value={model.id} key={model.id}>
                    {model.id}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
