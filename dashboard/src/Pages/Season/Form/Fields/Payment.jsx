import Typography from 'Components/UI/Typography';
import Info from 'Icons/Info';
import YokassaCard from 'Icons/YokassaCard';
import { Controller, useFormContext } from 'react-hook-form';

export default function Payment({ name }) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={() => (
        <div className="season-form__payment">
          <input name={name} value="yookassa" hidden />
          <div className="season-form__payment-icon">
            <YokassaCard />
          </div>
          <div className="season-form__payment-caption">
            <Info />
            <Typography type="caption" size="large" color="gray">
              На сайте используется только этот тип платежной системы, поэтому
              он автоматически выбирается
            </Typography>
          </div>
        </div>
      )}
    />
  );
}
