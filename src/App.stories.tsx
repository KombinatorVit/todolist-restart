import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";
import App from "./App";
import {ReduxStoreProviderDecorator} from "./stories/decorators/ReduxStoreProviderDecorator";

export default {
    title: 'Todolist/App',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>


const Template: ComponentStory<typeof App> = (args) => <App/>

export const AppExample = Template.bind({})
AppExample.args = {}

