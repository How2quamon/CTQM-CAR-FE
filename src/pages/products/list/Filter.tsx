import { Form, Select } from "antd";
import { loadavg } from "os";
import React from "react";

interface FilterProps {
    setFilter: Function;
    filter: any;
    loading: boolean
}

export default function Filter({ setFilter, filter, loading}: FilterProps) {
    const onChangeCarModel = (carModel: string) => {
        setFilter({ ...filter, carModel: carModel });
    };

    return (
        <React.Fragment>
            <div className="flex items-end">
            <Form.Item name='carModel'>
                <Select
                loading={loading}
                    defaultValue={null}
                    className='ml-[181px]'
                    style={{ width: 100 }}
                    options={[
                        { value: null, label: 'New' },
                        { value: 11, label: 'Old' },
                        { value: 21, label: 'Sale off' },
                    ]}
                />
                </Form.Item>
                <Form.Item name='carModel'>
                    <Select
                        defaultValue={null}
                        className='ml-5'
                        style={{ width: 230 }}
                        onChange={onChangeCarModel}
                        options={[
                            { value: null, label: 'Mercedes-Maybach' },
                            { value: 1, label: 'Mercedes-AMG' },
                            { value: 2, label: 'Mercedes-Benz GLS-Class' },
                            { value: 3, label: 'Mercedes-Benz G-Class' },
                            { value: 4, label: 'Mercedes-Benz EQ' },
                            { value: 5, label: 'Mercedes-Benz CLS-Class' },
                            { value: 6, label: 'Mercedes-Benz SL-Class' },
                        ]}
                    />
                </Form.Item>
            </div>
        </React.Fragment>
    );
}
