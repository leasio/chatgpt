import React from "react";

const App: React.FC = () => {
  const send = () => {
    fetch("/api/chat", {
      method: 'post',
      body: JSON.stringify({
        messages: [{"role": "user", "content": "Hello!"}]
    })
    })
  }
  
  return <div className="w-screen h-screen">
    <div className="h-full transition-all p-4">
      <div className="h-full overflow-hidden border rounded-md shadow-md">
        <div className="flex flex-col w-full h-full">
          <main className="flex-1 overflow-hidden">
            <div className="h-full overflow-hidden overflow-y-auto">
              <div className="w-full max-w-screen-xl m-auto p-4">
                <div className="flex w-full mb-6 overflow-hidden flex-row-reverse">
                  <div className="flex items-center justify-center flex-shrink-0 h-8 overflow-hidden rounded-full basis-8 ml-2">
                    <div className="w-8 h-8 leading-8 bg-gray-300 text-center">Q</div>
                  </div>
                  <div className="overflow-hidden text-sm items-end">
                    <p className="text-xs text-gray-300 text-right">2023/3/31 14:05:32</p>
                    <div className="text-white text-wrap min-w-5 rounded-md px-3 py-2 bg-blue-500 text-white">123</div>
                  </div>
                </div>
                <div className="flex w-full mb-6 overflow-hidden">    
                  <div className="flex items-center justify-center flex-shrink-0 h-8 overflow-hidden rounded-full basis-8 mr-2">
                    <div className="w-8 h-8 leading-8 bg-gray-300 text-center">A</div>
                  </div>
                  <div className="overflow-hidden text-sm items-end">
                    <p className="text-xs text-gray-300 text-right">2023/3/31 14:05:32</p>
                    <div className="text-black text-wrap min-w-5 rounded-md px-3 py-2 bg-gray-100">321</div>
                  </div>
                </div>
                <div className="flex w-full mb-6 overflow-hidden flex-row-reverse">
                  <div className="flex items-center justify-center flex-shrink-0 h-8 overflow-hidden rounded-full basis-8 ml-2">
                    <div className="w-8 h-8 leading-8 bg-gray-300 text-center">Q</div>
                  </div>
                  <div className="overflow-hidden text-sm items-end">
                    <p className="text-xs text-gray-300 text-right">2023/3/31 14:05:32</p>
                    <div className="text-white text-wrap min-w-5 rounded-md px-3 py-2 bg-blue-500">123</div>
                  </div>
                </div>
                <div className="flex w-full mb-6 overflow-hidden">
                  <div className="flex items-center justify-center flex-shrink-0 h-8 overflow-hidden rounded-full basis-8 mr-2">
                    <div className="w-8 h-8 leading-8 bg-gray-300 text-center">A</div>
                  </div>
                  <div className="overflow-hidden text-sm items-end">
                    <p className="text-xs text-gray-300 text-right">2023/3/31 14:05:32</p>
                    <div className="text-black text-wrap min-w-5 rounded-md px-3 py-2 bg-gray-100">321</div>
                  </div>
                </div>
              </div>
            </div>
          </main>

          <footer className="p-4">
            <div className="flex items-center justify-between space-x-2">
              <input className="flex-1 block w-full h-10 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 focus:h-10 focus-visible:outline-none resize-none px-3 py-2" type="text" placeholder="开聊~" />
              <button className="text-white min-w-10 h-10 rounded-md px-3 ml-1 bg-blue-500" onClick={send}>发送</button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </div>;
};

export default App;
