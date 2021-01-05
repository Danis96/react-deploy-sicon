import React, { useImperativeHandle, forwardRef } from 'react';
import { DatePicker, Form, Button } from 'antd';
import moment from 'moment';

export const AvAntdDatePicker = forwardRef((props, ref) => {
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    submitPicker() {
      const forma = form.getFieldsValue();

      if(forma.datePicker) return forma.datePicker.unix()
      else return  null
    },
  }));

  return (
    <Form form={form}>
      <Form.Item name="datePicker" rules={[{ required: true }]}>
        {/*<DatePicker defaultValue={props.date ? moment.unix(props.date) : null}  className="form-control" />*/}
      </Form.Item>
    </Form>
  );
});
