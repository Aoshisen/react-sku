import { IBaseProps } from "../components";
import { data } from "../data";
type SkuInfos = typeof data.skuInfos;
type List = typeof data.list;
export type BaseButtons = IBaseProps["buttons"];

export function enRichData(data: string[] | undefined) {
  if (!data) {
    return [];
  }
  return data.map((item) => ({
    value: item,
    disable: false,
    active: false,
  }));
}
export function active(buttons: BaseButtons, button: string) {
  return buttons?.map((item) => ({
    ...item,
    active: item.value === button,
  }));
}
export function disable(buttons: BaseButtons, new_list: List) {
  console.log(new_list, "<<<<<<<<<", buttons);
  return buttons?.map((button) => {
    const disable = !new_list.some((item) =>
      item.attributeValues.some(
        (attribute) => attribute.attributeValue === button.value
      )
    );
    return { ...button, disable };
  });
}

export function findCategory(categoryName: string) {
  return data.list
    .find((item) => item.attributeDisplayName === categoryName)
    ?.attributeValues.map((item) => item.attributeValue);
}

export function findProducts(
  categoryValues: string[],
  perviousResult?: SkuInfos
): SkuInfos {
  //当前使用的变量,第一次循环使用data.skuInfos;
  perviousResult = perviousResult ? perviousResult : data.skuInfos;
  let useSkuInfos = data.skuInfos;
  let result = useSkuInfos;
  let filterCategoryValues = categoryValues.filter((item) => !!item);
  const currentCategoryName = filterCategoryValues[0];
  //删除最后一个
  filterCategoryValues.shift();
  result = useSkuInfos.filter((sku) => {
    return sku.attributes.some(
      ({ attributeDisplayName, attributeValue }) =>
        attributeDisplayName === currentCategoryName ||
        attributeValue === currentCategoryName
    );
  });
  //对result 和之前的结果取交集
  result = Unit(result, perviousResult);
  const shouldReturn = result.length === 0 || filterCategoryValues.length === 0;
  if (shouldReturn) {
    return result;
  } else {
    return findProducts(filterCategoryValues, result);
  }
}
function Unit(firstInfo: SkuInfos, secondInfo: SkuInfos) {
  let result: SkuInfos = [];
  firstInfo.map((info) => {
    const { specId } = info;
    const valid = secondInfo.some(
      (second_info) => second_info.specId === specId
    );
    if (valid) {
      result = [...result, info];
    }
  });
  return result;
}

function checkPlace(name: string) {
  const place = ["中国", "日本", "美国"];
  const result = place.some((item) => item === name);
  console.log(result, name, "checkPlace");
  return result;
}
export function getListFrom(data?: SkuInfos) {
  if (!data) {
    return [];
  }
  let list: List = [];
  function checkAttributeName(name: string) {
    return list.some((item) => item?.attributeDisplayName === name);
  }
  function checkAttributeValue(name: string) {
    const result = list.some((item) =>
      item.attributeValues.some(
        (attribute) => attribute.attributeValue === name
      )
    );
    return result;
  }

  data.map((item) => {
    const { attributes } = item;
    attributes.map((attribute) => {
      const { attributeDisplayName, attributeValue } = attribute;
      const isPlace = checkPlace(attributeDisplayName);
      const renderAttributeDisplayName = isPlace
        ? "产地"
        : attributeDisplayName;
      const renderAttributeValue = isPlace
        ? attributeDisplayName
        : attributeValue;

      if (!checkAttributeName(renderAttributeDisplayName)) {
        //list 里面没有attributeDisplayName
        list = [
          ...list,
          {
            attributeDisplayName: renderAttributeDisplayName,
            attributeValues: [
              {
                attributeValue: renderAttributeValue,
              },
            ],
          },
        ];
      } else {
        if (!checkAttributeValue(renderAttributeValue)) {
          console.log("attributeValue", renderAttributeValue);
          list = list.map((item) => {
            const isCurrentAttribute =
              item.attributeDisplayName === renderAttributeDisplayName;
            const currentItem = {
              ...item,
              attributeValues: [
                ...item.attributeValues,
                {
                  attributeValue: renderAttributeValue,
                },
              ],
            };
            return isCurrentAttribute ? currentItem : item;
          });
        }
      }
    });
  });

  return list;
}
