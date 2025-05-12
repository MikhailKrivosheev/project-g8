import FormLayout from 'Components/FormLayout';
import { SettingsContext, SettingsContextProvider } from 'Context/Settings';
import { RecoilRoot } from 'recoil';
import Form from './Form';

export default function EditableContent() {
  return (
    <RecoilRoot>
      <SettingsContextProvider>
        <FormLayout
          condition
          title={() => 'Редактируемый контент'}
          context={SettingsContext}
        >
          <Form />
        </FormLayout>
      </SettingsContextProvider>
    </RecoilRoot>
  );
}
