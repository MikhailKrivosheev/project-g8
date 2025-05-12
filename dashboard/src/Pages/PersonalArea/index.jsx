import { SettingsContext, SettingsContextProvider } from 'Context/Settings';
import FormLayout from 'Components/FormLayout';
import Form from './Form';

export default function PersonalArea() {
  return (
    <SettingsContextProvider>
      <FormLayout
        condition
        title={() => 'Личный кабинет пользователя'}
        context={SettingsContext}
      >
        <Form />
      </FormLayout>
    </SettingsContextProvider>
  );
}
