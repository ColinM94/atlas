import { useAppStoreSlice } from 'stores/useAppStore/useAppStore';
import { List } from 'components/list/list';
import { defaultfilm } from 'constants/defaults';

export const FilmsPage = () => {
  const { filmsLayout } = useAppStoreSlice('filmsLayout');

  return (
    <List
      items={(item) => ({
        id: item.id,
        name: item.name,
        data: item,
      })}
      collection="films"
      defaultData={defaultfilm}
      mainPropertyKey="name"
      inputs={[
        {
          inputType: 'text',
          propertyKey: 'name',
        },
      ]}
      layout={filmsLayout}
      aspectRatio={0.65}
    />
  );
};
