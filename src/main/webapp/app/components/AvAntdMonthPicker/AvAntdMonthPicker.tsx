import React, { useImperativeHandle, forwardRef } from 'react';
import { DatePicker, Form } from 'antd';
import moment from 'moment';

export const AvAntdMonthPicker = forwardRef((props, ref) => {
  const [form] = Form.useForm();


    const submitPicker = () => {
      const forma = form.getFieldsValue();
      if(forma.monthYearPicker) return forma.monthYearPicker.unix();
      else return null
    }


  return (
    <Form
      form={form}
      initialValues={{
        monthYearPicker: moment(moment(), "DD-MM-YYY")
      }}
    >
      <Form.Item name="monthYearPicker" rules={[{ required: true }]}>
        <DatePicker
          picker="month"
          className="form-control"
        />
      </Form.Item>
    </Form>
  );
});
