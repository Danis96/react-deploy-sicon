import React, { useImperativeHandle, forwardRef } from 'react';
import { DatePicker, Form, Button } from 'antd';
import moment from 'moment';
import { format } from 'path';

export const AvAntdYearPicker = forwardRef((props, ref) => {
  const [form] = Form.useForm();
  useImperativeHandle(ref, () => ({
    submitPicker() {
      const forma = form.getFieldsValue();
      if(forma.yearPicker) {
        return forma.yearPicker.unix();
      }
      else return null
    },
  }));
  return (
    <Form form={form}>
      <Form.Item
        name="yearPicker"
        rules={[{ required: true}]}
      >
     {/*   <DatePicker picker="year"
                    required
                    defaultValue={props.year ? moment.unix(props.year) : null}
                    className="form-control"/>*/}
      </Form.Item>
    </Form>
  );
})
