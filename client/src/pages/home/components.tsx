import React from "react";

export function TodoItem() {
  return (
    <div className="border-b border-slate-100 p-4 cursor-pointer hover:bg-slate-100">
      <h3 className="font-semibold text-md">안녕하세요잉</h3>
      <p className="text-xs text-gray-400">우하ㅏㅏ하하하하하하</p>
    </div>
  );
}

export function TodoDetail() {
  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-4">안녕하세요잉</h3>
      <p className="text-sm">
        우하ㅏㅏ하하하하하하우하ㅏㅏ하하하하하하우하ㅏㅏ하하하하하하우하ㅏㅏ하하하하하하우하ㅏㅏ하하하하하하우하ㅏㅏ하하하하하하우하ㅏㅏ하하하하하하우하ㅏㅏ하하하하하하
      </p>
    </div>
  );
}
