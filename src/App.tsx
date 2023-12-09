import { BaseLayout, IBaseProps } from "./components";
import "./app.css";
import { useEffect, useRef, useState } from "react";
import {
  findCategory,
  active,
  BaseButtons,
  enRichData,
  findProducts,
  getListFrom,
  disable,
} from "./helper";

const colors_data = findCategory("颜色");
const sizes_data = findCategory("尺码");
const place_data = findCategory("产地");

function App() {
  const [colors, setColors] = useState<BaseButtons>(enRichData(colors_data));
  const [sizes, setSizes] = useState<BaseButtons>(enRichData(sizes_data));
  const [place, setPlace] = useState<BaseButtons>(enRichData(place_data));

  const [color_active, setColorActive] = useState<string>("");
  const [size_active, setSizeActive] = useState<string>("");
  const [place_active, setPlaceActive] = useState<string>("");
  const isMount = useRef<number>(0);
  useEffect(() => {
    if (!isMount.current) {
      isMount.current++;
      return;
    }
    const _place_active = place?.find((item) => item.active);
    const _color_active = colors?.find((item) => item.active);
    const _size_active = sizes?.find((item) => item.active);
    if (_place_active?.value !== place_active) {
      setPlaceActive(_place_active?.value || "");
    }
    if (_size_active?.value !== size_active) {
      setSizeActive(_size_active?.value || "");
    }
    if (_color_active?.value !== color_active) {
      setColorActive(_color_active?.value || "");
    }
  }, [place, sizes, colors]);

  useEffect(() => {
    //找到所有产地为place_active de sku
    if (!place_active) {
      return;
    }
    const productList = findProducts([place_active, color_active, size_active]);
    const new_list = getListFrom(productList);
    setColors((colors) => disable(colors, new_list));
    setSizes((sizes) => disable(sizes, new_list));
    // console.log(
    //   place_active,
    //   color_active,
    //   size_active,
    //   "place_active<<<<<<<<<"
    // );
  }, [place_active]);
  useEffect(() => {
    if (!color_active) {
      return;
    }
    const productList = findProducts([place_active, color_active, size_active]);
    // const productList = findProducts([color_active]);
    const new_list = getListFrom(productList);
    setPlace((place) => disable(place, new_list));
    setSizes((sizes) => disable(sizes, new_list));
    console.log(
      place_active,
      color_active,
      size_active,
      "color_active<<<<<<<<<"
    );
  }, [color_active]);

  useEffect(() => {
    // const productList = findProducts([size_active]);
    if (!size_active) {
      return;
    }
    const productList = findProducts([place_active, color_active, size_active]);
    const new_list = getListFrom(productList);
    setColors((colors) => disable(colors, new_list));
    setPlace((place) => disable(place, new_list));
    console.log(
      place_active,
      color_active,
      size_active,
      "size_active<<<<<<<<<"
    );
  }, [size_active]);

  function handlePlaceClick(_place: string) {
    setPlace((place) => active(place, _place));
  }
  function handleSizeClick(size: string) {
    setSizes((sizes) => active(sizes, size));
  }
  function handleColorClick(color: string) {
    setColors((colors) => active(colors, color));
  }
  return (
    <div className="app">
      <div className="content">
        <BaseLayout
          label="产地"
          buttons={place}
          onButtonsClick={handlePlaceClick}
        ></BaseLayout>
        <BaseLayout
          label="尺码"
          buttons={sizes}
          onButtonsClick={handleSizeClick}
        ></BaseLayout>
        <BaseLayout
          label="颜色"
          buttons={colors}
          onButtonsClick={handleColorClick}
        ></BaseLayout>
      </div>
    </div>
  );
}

export default App;
