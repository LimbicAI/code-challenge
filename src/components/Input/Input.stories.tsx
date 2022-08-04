import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Input, Props } from './Input';

const meta: Meta = {
    title: 'Components/Input',
    component: Input,
    argTypes: {
        onClick: { action: 'clicked' },
        children: {
            defaultValue: 'Default Text'
        }
    }
};

const Template: Story<Props> = (args) => <Input {...args} />;

export const Text = Template.bind({});
Text.args = {
    type: 'text'
};
export default meta;
