import { List } from 'components/list/list';
import { defaultShoppingItem } from 'constants/defaults';

export const ShoppingPage = () => {
  return (
    <List
      collection="shopping"
      defaultData={defaultShoppingItem}
      inputs={[
        {
          inputType: 'text',
          propertyKey: 'name',
        },
      ]}
      items={(dataItem) => ({
        id: dataItem.id,
        data: dataItem,
        name: dataItem.name,
      })}
      mainPropertyKey="name"
    />
  );
};
