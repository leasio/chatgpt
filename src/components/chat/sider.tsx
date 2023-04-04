import React, { useEffect, useState } from "react";
import request from "@/utils/request";
import { PAGES, useAppContext } from "@/context/app";
import { useChatContext } from "@/context/chat";
import Select from "@/components/common/select";
import Button from "@/components/common/button";

const Header: React.FC = () => {
  const { setPage } = useAppContext();
  const { model, setModel } = useChatContext();
  const [models, setModels] = useState<{ id: string }[]>([{ id: model }]);

  const getModelList = () => {
    request.get("/api/models")
      .then((data) => {
        setModels(data.data ?? [{ id: model }]);
      });
  };

  useEffect(() => {
    getModelList();
  }, []);

  return (
    <div className="w-60 border-r-2 shadow-inner p-4">
      <div className="border-b-2 mb-4 pb-4 space-y-2">
        <div className="flex items-center">
          <label>模型：</label>
          <Select 
            className="max-w-[158px] flex-1"
            options={models?.map(model => ({ label: model.id, value: model.id }))} 
            value={model}
            onChange={(e) => setModel(e.target?.value)}
          />
        </div>
      </div>

      <Button 
        btnType="primary" 
        onClick={() => setPage(PAGES.IMAGES)}
      >去找图</Button>
    </div>
  );
};

export default Header;
