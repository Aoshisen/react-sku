import { data } from "./data";
import { BaseLayout } from "./components";
import "./app.css";

function findCategory(categoryName: string) {
  return data.list
    .find((item) => item.attributeDisplayName === categoryName)
    ?.attributeValues.map((item) => item.attributeValue);
}
const colors = findCategory("颜色");
const sizes = findCategory("尺码");
const place = findCategory("产地");

// interface IData {
//   data: any;
// }
// const Colors: React.FC<IData> = ({ data }) => {
//   return <BaseLayout label="颜色" buttons={data}></BaseLayout>;
// };

// const Sizes: React.FC<IData> = ({ data }) => {
//   return <BaseLayout label="尺码" buttons={data}></BaseLayout>;
// };
// const Place: React.FC<IData> = ({ data }) => {
//   return <BaseLayout label="产地" buttons={data}></BaseLayout>;
// };

function App() {
  console.log(colors, "colors<<<<<<");
  console.log(sizes, "sizes<<<<<<");
  console.log(place, "place<<<<<<");
  return (
    <div className="app">
      <div className="content">
        <BaseLayout label="产地" buttons={place}></BaseLayout>
        <BaseLayout label="尺码" buttons={sizes}></BaseLayout>
        <BaseLayout label="颜色" buttons={colors}></BaseLayout>
      </div>
      {/* <Colors data={colors}></Colors>
      <Sizes data={sizes}></Sizes>
      <Place data={place}></Place> */}
    </div>
  );
}

export default App;
