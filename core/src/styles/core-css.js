import {css} from 'lit'

export const friendsViewStyles = css`
    * {
        box-sizing: border-box;
    }

    .top-bar-icon {
        cursor: pointer;
        height: 18px;
        width: 18px;
        transition: 0.2s all;
    }

    .top-bar-icon:hover {
        color: var(--black);
    }

    .modal-button {
        font-family: Roboto, sans-serif;
        font-size: 16px;
        color: var(--mdc-theme-primary);
        background-color: transparent;
        padding: 8px 10px;
        border-radius: 5px;
        border: none;
        transition: all 0.3s ease-in-out;
    }

    .close-row {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        height: 50px;
        flex: 0
    }

    .container-body {
        width: 100%;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        margin-top: 5px;
        padding: 0px 6px;
        box-sizing: border-box;
        align-items: center;
        gap: 10px;
    }

    .container-body::-webkit-scrollbar-track {
        background-color: whitesmoke;
        border-radius: 7px;
    }

    .container-body::-webkit-scrollbar {
        width: 6px;
        border-radius: 7px;
        background-color: whitesmoke;
    }

    .container-body::-webkit-scrollbar-thumb {
        background-color: rgb(180, 176, 176);
        border-radius: 7px;
        transition: all 0.3s ease-in-out;
    }

    .container-body::-webkit-scrollbar-thumb:hover {
        background-color: rgb(148, 146, 146);
        cursor: pointer;
    }

    p {
        color: var(--black);
        margin: 0px;
        padding: 0px;
        word-break: break-all;
    }

    .container {
        display: flex;
        width: 100%;
        flex-direction: column;
        height: 100%;
    }

    .chat-right-panel-label {
        font-family: Montserrat, sans-serif;
        color: var(--group-header);
        padding: 5px;
        font-size: 13px;
        user-select: none;
    }

    .group-info {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 10px;
    }

    .group-name {
        font-family: Raleway, sans-serif;
        font-size: 20px;
        color: var(--chat-bubble-msg-color);
        text-align: center;
        user-select: none;
    }

    .group-description {
        font-family: Roboto, sans-serif;
        color: var(--chat-bubble-msg-color);
        letter-spacing: 0.3px;
        font-weight: 300;
        font-size: 14px;
        margin-top: 15px;
        word-break: break-word;
        user-select: none;
    }

    .group-subheader {
        font-family: Montserrat, sans-serif;
        font-size: 14px;
        color: var(--chat-bubble-msg-color);
    }

    .group-data {
        font-family: Roboto, sans-serif;
        letter-spacing: 0.3px;
        font-weight: 300;
        font-size: 14px;
        color: var(--chat-bubble-msg-color);
    }

    .search-results-div {
        position: absolute;
        top: 25px;
        right: 25px;
    }

    .name-input {
        width: 100%;
        outline: 0;
        border-width: 0 0 2px;
        border-color: var(--mdc-theme-primary);
        background-color: transparent;
        padding: 10px;
        font-family: Roboto, sans-serif;
        font-size: 15px;
        color: var(--chat-bubble-msg-color);
        box-sizing: border-box;
    }

    .name-input::selection {
        background-color: var(--mdc-theme-primary);
        color: white;
    }

    .name-input::placeholder {
        opacity: 0.9;
        color: var(--black);
    }

    .search-field {
        width: 100%;
        position: relative;
    }

    .search-icon {
        position: absolute;
        right: 3px;
        color: var(--chat-bubble-msg-color);
        transition: hover 0.3s ease-in-out;
        background: none;
        border-radius: 50%;
        padding: 6px 3px;
        font-size: 21px;
    }

    .search-icon:hover {
        cursor: pointer;
        background: #d7d7d75c;
    }
`

export const feedItemStyles = css`
    * {
        --mdc-theme-text-primary-on-background: var(--black);
        box-sizing: border-box;
    }

    :host {
        width: 100%;
        box-sizing: border-box;
    }

    img {
        width: 100%;
        max-height: 30vh;
        border-radius: 5px;
        cursor: pointer;
        position: relative;
    }

    .smallLoading,
    .smallLoading:after {
        border-radius: 50%;
        width: 2px;
        height: 2px;
    }

    .smallLoading {
        border-width: 0.8em;
        border-style: solid;
        border-color: rgba(3, 169, 244, 0.2) rgba(3, 169, 244, 0.2) rgba(3, 169, 244, 0.2) rgb(3, 169, 244);
        font-size: 30px;
        position: relative;
        text-indent: -9999em;
        transform: translateZ(0px);
        animation: 1.1s linear 0s infinite normal none running loadingAnimation;
    }

    .defaultSize {
        width: 100%;
        height: 160px;
    }

    .parent-feed-item {
        position: relative;
        display: flex;
        background-color: var(--chat-bubble-bg);
        flex-grow: 0;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        border-radius: 5px;
        padding: 12px 15px 4px 15px;
        min-width: 150px;
        width: 100%;
        box-sizing: border-box;
        cursor: pointer;
        font-size: 16px;
    }

    .avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        align-items: center;
    }

    .avatarApp {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        align-items: center;
    }

    .feed-item-name {
        user-select: none;
        color: #03a9f4;
        margin-bottom: 5px;
    }

    .app-name {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    mwc-menu {
        position: absolute;
    }

    @-webkit-keyframes loadingAnimation {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }

        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }

    @keyframes loadingAnimation {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }

        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
`

export const profileModalUpdateStyles = css`
    * {
        --mdc-theme-primary: rgb(3, 169, 244);
        --mdc-theme-secondary: var(--mdc-theme-primary);
        --mdc-theme-surface: var(--white);
        --mdc-dialog-content-ink-color: var(--black);
        --mdc-dialog-min-width: 400px;
        --mdc-dialog-max-width: 1024px;
        box-sizing: border-box;
    }

    .input {
        width: 90%;
        outline: 0;
        border-width: 0 0 2px;
        border-color: var(--mdc-theme-primary);
        background-color: transparent;
        padding: 10px;
        font-family: Roboto, sans-serif;
        font-size: 15px;
        color: var(--chat-bubble-msg-color);
        box-sizing: border-box;
    }

    .input::selection {
        background-color: var(--mdc-theme-primary);
        color: white;
    }

    .input::placeholder {
        opacity: 0.6;
        color: var(--black);
    }

    .modal-button {
        font-family: Roboto, sans-serif;
        font-size: 16px;
        color: var(--mdc-theme-primary);
        background-color: transparent;
        padding: 8px 10px;
        border-radius: 5px;
        border: none;
        transition: all 0.3s ease-in-out;
    }

    .modal-button-red {
        font-family: Roboto, sans-serif;
        font-size: 16px;
        color: #f44336;
        background-color: transparent;
        padding: 8px 10px;
        border-radius: 5px;
        border: none;
        transition: all 0.3s ease-in-out;
    }

    .modal-button-red:hover {
        cursor: pointer;
        background-color: #f4433663;
    }

    .modal-button:hover {
        cursor: pointer;
        background-color: #03a8f475;
    }

    .checkbox-row {
        position: relative;
        display: flex;
        align-items: center;
        align-content: center;
        font-family: Montserrat, sans-serif;
        font-weight: 600;
        color: var(--black);
    }

    .modal-overlay {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        /* Semi-transparent backdrop */
        z-index: 1000;
    }

    .modal-content {
        position: fixed;
        top: 50vh;
        left: 50vw;
        transform: translate(-50%, -50%);
        background-color: var(--mdc-theme-surface);
        width: 80vw;
        padding: 20px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px;
        z-index: 1001;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
    }

    .modal-overlay.hidden {
        display: none;
    }

    .avatar {
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
    }

    .app-name {
        display: flex;
        gap: 20px;
        align-items: center;
        width: 100%;
        cursor: pointer;
        padding: 5px;
        border-radius: 5px;
        margin-bottom: 10px;
    }

    .inner-content {
        display: flex;
        flex-direction: column;
        max-height: 75vh;
        flex-grow: 1;
        overflow: auto;
    }

    .inner-content::-webkit-scrollbar-track {
        background-color: whitesmoke;
        border-radius: 7px;
    }

    .inner-content::-webkit-scrollbar {
        width: 12px;
        border-radius: 7px;
        background-color: whitesmoke;
    }

    .inner-content::-webkit-scrollbar-thumb {
        background-color: rgb(180, 176, 176);
        border-radius: 7px;
        transition: all 0.3s ease-in-out;
    }

    .checkbox-row {
        position: relative;
        display: flex;
        align-items: center;
        align-content: center;
        font-family: Montserrat, sans-serif;
        font-weight: 600;
        color: var(--black);
    }
`

export const friendsSidePanelParentStyles = css`
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px;
        border-bottom: 1px solid #e0e0e0;
    }

    .content {
        padding: 16px;
    }

    .close {
        visibility: hidden;
        position: fixed;
        z-index: -100;
        right: -1000px;
    }

    .parent-side-panel {
        transform: translateX(100%);
        /* start from outside the right edge */
        transition: transform 0.3s ease-in-out;
    }

    .parent-side-panel.open {
        transform: translateX(0);
        /* slide in to its original position */

    }
`

export const friendsSidePanelStyles = css`
    :host {
        display: block;
        position: fixed;
        top: 55px;
        right: 0px;
        width: 420px;
        max-width: 95%;
        height: calc(100vh - 55px);
        background-color: var(--white);
        border-left: 1px solid rgb(224, 224, 224);
        z-index: 1;
        transform: translateX(100%);
        /* start from outside the right edge */
        transition: transform 0.3s ease-in-out;
    }

    :host([isOpen]) {
        transform: unset;
        /* slide in to its original position */
    }

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px;
        border-bottom: 1px solid #e0e0e0;
    }

    .content {
        padding: 16px;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        overflow: auto;
    }

    .content::-webkit-scrollbar-track {
        background-color: whitesmoke;
        border-radius: 7px;
    }

    .content::-webkit-scrollbar {
        width: 12px;
        border-radius: 7px;
        background-color: whitesmoke;
    }

    .content::-webkit-scrollbar-thumb {
        background-color: rgb(180, 176, 176);
        border-radius: 7px;
        transition: all 0.3s ease-in-out;
    }

    .parent {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .active {
        font-size: 16px;
        background: var(--black);
        color: var(--white);
        padding: 5px;
        border-radius: 2px;
        cursor: pointer;
    }

    .default {
        font-size: 16px;
        color: var(--black);
        padding: 5px;
        border-radius: 2px;
        cursor: pointer;
    }

    .default-content {
        visibility: hidden;
        position: absolute;
        z-index: -50;
    }
`

export const friendItemActionsStyles = css`
    :host {
        display: none;
        position: absolute;
        background-color: var(--white);
        border: 1px solid #ddd;
        padding: 8px;
        z-index: 10;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        color: var(--black);
        max-width: 250px;
    }

    .close-icon {
        cursor: pointer;
        float: right;
        margin-left: 10px;
        color: var(--black);
    }

    .send-message-button {
        font-family: Roboto, sans-serif;
        letter-spacing: 0.3px;
        font-weight: 300;
        padding: 8px 5px;
        border-radius: 3px;
        text-align: center;
        color: var(--mdc-theme-primary);
        transition: all 0.3s ease-in-out;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .send-message-button:hover {
        cursor: pointer;
        background-color: #03a8f485;
    }

    .action-parent {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    div[tabindex='0']:focus {
        outline: none;
    }
`

export const coreSyncStatusStyles = css`
    .lineHeight {
        line-height: 33%;
    }

    .tooltip {
        display: inline-block;
        position: relative;
        text-align: left;
    }

    .tooltip .bottom {
        min-width: 200px;
        max-width: 250px;
        top: 35px;
        left: 50%;
        transform: translate(-50%, 0);
        padding: 10px 10px;
        color: var(--black);
        background-color: var(--white);
        font-weight: normal;
        font-size: 13px;
        border-radius: 8px;
        position: absolute;
        z-index: 99999999;
        box-sizing: border-box;
        box-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);
        border: 1px solid var(--black);
        visibility: hidden;
        opacity: 0;
        transition: opacity 0.8s;
    }

    .tooltip:hover .bottom {
        visibility: visible;
        opacity: 1;
    }

    .tooltip .bottom i {
        position: absolute;
        bottom: 100%;
        left: 50%;
        margin-left: -12px;
        width: 24px;
        height: 12px;
        overflow: hidden;
    }

    .tooltip .bottom i::after {
        content: '';
        position: absolute;
        width: 12px;
        height: 12px;
        left: 50%;
        transform: translate(-50%, 50%) rotate(45deg);
        background-color: var(--white);
        border: 1px solid var(--black);
        box-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);
    }
`

export const chatSideNavHeadsStyles = css`
    :host {
        width: 100%;
    }

    ul {
        list-style-type: none;
    }

    li {
        padding: 10px 2px 10px 5px;
        cursor: pointer;
        width: 100%;
        display: flex;
        box-sizing: border-box;
        font-size: 14px;
        transition: 0.2s background-color;
    }

    li:hover {
        background-color: var(--lightChatHeadHover);
    }

    .active {
        background: var(--menuactive);
        border-left: 4px solid #3498db;
    }

    .img-icon {
        font-size: 40px;
        color: var(--chat-group);
    }

    .status {
        color: #92959e;
    }

    .clearfix {
        display: flex;
        align-items: center;
    }

    .clearfix:after {
        visibility: hidden;
        display: block;
        font-size: 0;
        content: " ";
        clear: both;
        height: 0;
    }
`

export const beginnerChecklistStyles = css`
    .layout {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
    }

    .count {
        position: absolute;
        top: -5px;
        right: -5px;
        font-size: 12px;
        background-color: red;
        color: white;
        border-radius: 50%;
        width: 16px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .nocount {
        display: none;
    }

    .popover-panel {
        position: absolute;
        width: 200px;
        padding: 10px;
        background-color: var(--white);
        border: 1px solid var(--black);
        border-radius: 4px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        top: 40px;
        max-height: 350px;
        overflow: auto;
        scrollbar-width: thin;
        scrollbar-color: #6a6c75 #a1a1a1;
    }

    .popover-panel::-webkit-scrollbar {
        width: 11px;
    }

    .popover-panel::-webkit-scrollbar-track {
        background: #a1a1a1;
    }

    .popover-panel::-webkit-scrollbar-thumb {
        background-color: #6a6c75;
        border-radius: 6px;
        border: 3px solid #a1a1a1;
    }

    .list {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .task-list-item {
        display: flex;
        gap: 15px;
        justify-content: space-between;
        align-items: center;
    }

    .checklist-item {
        padding: 5px;
        border-bottom: 1px solid;
        display: flex;
        justify-content: space-between;
        cursor: pointer;
        transition: 0.2s all;
    }

    .checklist-item:hover {
        background: var(--nav-color-hover);
    }

    p {
        font-size: 16px;
        color: var(--black);
        margin: 0px;
        padding: 0px;
    }
`

export const addFriendsModalStyles = css`
    * {
        --mdc-theme-primary: rgb(3, 169, 244);
        --mdc-theme-secondary: var(--mdc-theme-primary);
        --mdc-theme-surface: var(--white);
        --mdc-dialog-content-ink-color: var(--black);
        --mdc-dialog-min-width: 400px;
        --mdc-dialog-max-width: 1024px;
        box-sizing: border-box;
    }

    .input {
        width: 90%;
        outline: 0;
        border-width: 0 0 2px;
        border-color: var(--mdc-theme-primary);
        background-color: transparent;
        padding: 10px;
        font-family: Roboto, sans-serif;
        font-size: 15px;
        color: var(--chat-bubble-msg-color);
        box-sizing: border-box;
    }

    .input::selection {
        background-color: var(--mdc-theme-primary);
        color: white;
    }

    .input::placeholder {
        opacity: 0.6;
        color: var(--black);
    }

    .modal-button {
        font-family: Roboto, sans-serif;
        font-size: 16px;
        color: var(--mdc-theme-primary);
        background-color: transparent;
        padding: 8px 10px;
        border-radius: 5px;
        border: none;
        transition: all 0.3s ease-in-out;
    }

    .modal-button-red {
        font-family: Roboto, sans-serif;
        font-size: 16px;
        color: #f44336;
        background-color: transparent;
        padding: 8px 10px;
        border-radius: 5px;
        border: none;
        transition: all 0.3s ease-in-out;
    }

    .modal-button-red:hover {
        cursor: pointer;
        background-color: #f4433663;
    }

    .modal-button:hover {
        cursor: pointer;
        background-color: #03a8f475;
    }

    .checkbox-row {
        position: relative;
        display: flex;
        align-items: center;
        align-content: center;
        font-family: Montserrat, sans-serif;
        font-weight: 600;
        color: var(--black);
    }

    .modal-overlay {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        /* Semi-transparent backdrop */
        z-index: 1000;
    }

    .modal-content {
        position: fixed;
        top: 50vh;
        left: 50vw;
        transform: translate(-50%, -50%);
        background-color: var(--mdc-theme-surface);
        width: 80vw;
        max-width: 600px;
        padding: 20px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px;
        z-index: 1001;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
    }

    .modal-overlay.hidden {
        display: none;
    }

    .avatar {
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
    }

    .app-name {
        display: flex;
        gap: 20px;
        align-items: center;
        width: 100%;
        cursor: pointer;
        padding: 5px;
        border-radius: 5px;
        margin-bottom: 10px;
    }

    .inner-content {
        display: flex;
        flex-direction: column;
        max-height: 75vh;
        flex-grow: 1;
        overflow: auto;
    }

    .inner-content::-webkit-scrollbar-track {
        background-color: whitesmoke;
        border-radius: 7px;
    }

    .inner-content::-webkit-scrollbar {
        width: 12px;
        border-radius: 7px;
        background-color: whitesmoke;
    }

    .inner-content::-webkit-scrollbar-thumb {
        background-color: rgb(180, 176, 176);
        border-radius: 7px;
        transition: all 0.3s ease-in-out;
    }
`

export const saveSettingsQdnStyles = css`
    :host {
        margin-right: 20px;
    }

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px;
        border-bottom: 1px solid #e0e0e0;
    }

    .content {
        padding: 16px;
    }

    .close {
        visibility: hidden;
        position: fixed;
        z-index: -100;
        right: -1000px;
    }

    .parent-side-panel {
        transform: translateX(100%);
        /* start from outside the right edge */
        transition: transform 0.3s ease-in-out;
    }

    .parent-side-panel.open {
        transform: translateX(0);
        /* slide in to its original position */
    }

    .notActive {
        opacity: 0.5;
        cursor: default;
        color: var(--black);
    }

    .active {
        opacity: 1;
        cursor: pointer;
        color: green;
    }

    .accept-button {
        font-family: Roboto, sans-serif;
        letter-spacing: 0.3px;
        font-weight: 300;
        padding: 8px 5px;
        border-radius: 3px;
        text-align: center;
        color: var(--mdc-theme-primary);
        transition: all 0.3s ease-in-out;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 18px;
    }

    .accept-button:hover {
        cursor: pointer;
        background-color: #03a8f485;
    }

    .undo-button {
        font-family: Roboto, sans-serif;
        letter-spacing: 0.3px;
        font-weight: 300;
        padding: 8px 5px;
        border-radius: 3px;
        text-align: center;
        color: #f44336;
        transition: all 0.3s ease-in-out;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 18px;
    }

    .undo-button:hover {
        cursor: pointer;
        background-color: #f4433663;
    }
`

export const profileQdnStyles = css`
    * {
        --mdc-theme-primary: rgb(3, 169, 244);
        --mdc-theme-secondary: var(--mdc-theme-primary);
        --mdc-theme-surface: var(--white);
        --mdc-dialog-content-ink-color: var(--black);
        box-sizing: border-box;
    }

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px;
        border-bottom: 1px solid #e0e0e0;
    }

    .content {
        padding: 16px;
    }

    .close {
        visibility: hidden;
        position: fixed;
        z-index: -100;
        right: -1000px;
    }

    .parent-side-panel {
        transform: translateX(100%);
        /* start from outside the right edge */
        transition: transform 0.3s ease-in-out;
    }

    .parent-side-panel.open {
        transform: translateX(0);
        /* slide in to its original position */
    }

    .notActive {
        opacity: 0.5;
        cursor: default;
        color: var(--black);
    }

    .active {
        opacity: 1;
        cursor: pointer;
        color: green;
    }

    .accept-button {
        font-family: Roboto, sans-serif;
        letter-spacing: 0.3px;
        font-weight: 300;
        padding: 8px 5px;
        border-radius: 3px;
        text-align: center;
        color: var(--mdc-theme-primary);
        transition: all 0.3s ease-in-out;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 18px;
    }

    .accept-button:hover {
        cursor: pointer;
        background-color: #03a8f485;
    }

    .undo-button {
        font-family: Roboto, sans-serif;
        letter-spacing: 0.3px;
        font-weight: 300;
        padding: 8px 5px;
        border-radius: 3px;
        text-align: center;
        color: #f44336;
        transition: all 0.3s ease-in-out;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 18px;
    }

    .undo-button:hover {
        cursor: pointer;
        background-color: #f4433663;
    }

    .full-info-wrapper {
        width: 100%;
        min-width: 600px;
        max-width: 600px;
        text-align: center;
        background: var(--white);
        border: 1px solid var(--black);
        border-radius: 15px;
        padding: 25px;
        box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
        display: block !important;
    }

    .full-info-logo {
        width: 120px;
        height: 120px;
        background: var(--white);
        border: 1px solid var(--black);
        border-radius: 50%;
        position: relative;
        top: -110px;
        left: 210px;
    }

    .data-info {
        margin-top: 10px;
        margin-right: 25px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        min-height: 55vh;
        max-height: 55vh;
        overflow: auto;
    }

    .data-info::-webkit-scrollbar-track {
        background: #a1a1a1;
    }

    .data-info::-webkit-scrollbar-thumb {
        background-color: #6a6c75;
        border-radius: 6px;
        border: 3px solid #a1a1a1;
    }

    .data-info>* {
        flex-shrink: 0;
    }

    .decline {
        --mdc-theme-primary: var(--mdc-theme-error);
    }

    .warning {
        --mdc-theme-primary: #f0ad4e;
    }

    .green {
        --mdc-theme-primary: #198754;
    }

    .buttons {
        display: inline;
        float: right;
        margin-bottom: 5px;
    }

    .paybutton {
        display: inline;
        float: left;
        margin-bottom: 5px;
    }

    .round-fullinfo {
        position: relative;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        right: 25px;
        top: -1px;
    }

    h2 {
        margin: 10px 0;
    }

    h3 {
        margin-top: -80px;
        color: #03a9f4;
        font-size: 18px;
    }

    h4 {
        margin: 5px 0;
    }

    p {
        margin-top: 5px;
        line-height: 1.2;
        font-size: 16px;
        color: var(--black);
        text-align: start;
        overflow: hidden;
        word-break: break-word;
    }

    .send-message-button {
        cursor: pointer;
        transition: all 0.2s;
    }

    .send-message-button:hover {
        transform: scale(1.1);
    }
`

export const avatarComponentStyles = css`
    * {
        --mdc-theme-text-primary-on-background: var(--black);
        box-sizing: border-box;
    }

    :host {
        width: 100%;
        box-sizing: border-box;
    }

    img {
        width: 100%;
        max-height: 30vh;
        border-radius: 5px;
        cursor: pointer;
        position: relative;
    }

    .smallLoading,
    .smallLoading:after {
        border-radius: 50%;
        width: 2px;
        height: 2px;
    }

    .defaultSize {
        width: 100%;
        height: 160px;
    }

    .parent-feed-item {
        position: relative;
        display: flex;
        background-color: var(--chat-bubble-bg);
        flex-grow: 0;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        border-radius: 5px;
        padding: 12px 15px 4px 15px;
        min-width: 150px;
        width: 100%;
        box-sizing: border-box;
        cursor: pointer;
        font-size: 16px;
    }

    .avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        align-items: center;
    }

    .avatarApp {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        align-items: center;
    }

    .feed-item-name {
        user-select: none;
        color: #03a9f4;
        margin-bottom: 5px;
    }

    .app-name {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    mwc-menu {
        position: absolute;
    }
`

export const fragFileInputStyles = css`
    #drop-area {
        border: 2px dashed #ccc;
        font-family: "Roboto", sans-serif;
        padding: 20px;
    }

    #trigger:hover {
        cursor: pointer;
    }

    #drop-area.highlight {
        border-color: var(--mdc-theme-primary, #000);
    }

    p {
        margin-top: 0;
    }

    form {
        margin-bottom: 10px;
    }

    #fileInput {
        display: none;
    }
`

export const confirmTransactionDialogStyles = css`
    * {
        --mdc-theme-primary: rgb(3, 169, 244);
        --mdc-theme-secondary: var(--mdc-theme-primary);
        --mdc-theme-surface: var(--white);
        --mdc-dialog-content-ink-color: var(--black);
    }

    .decline {
        --mdc-theme-primary: var(--mdc-theme-error)
    }

    #txInfo {
        text-align: left;
        max-width: 520px;
        color: var(--black);
    }

    .buttons {
        text-align: right;
    }

    table td,
    th {
        padding: 4px;
        text-align: left;
        font-size: 14px;
        color: var(--black);
    }
`

export const loadingRippleStyles = css`
    * {
        --mdc-theme-primary: rgb(3, 169, 244);
        --mdc-theme-secondary: var(--mdc-theme-primary);
        --paper-spinner-color: var(--mdc-theme-secondary);
    }

    #rippleWrapper {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        height: 0;
        width: 0;
        z-index: 999;
        overflow: visible;
        --ripple-activating-transition: transform 0.3s cubic-bezier(0.6, 0.0, 1, 1), opacity 0.3s cubic-bezier(0.6, 0.0, 1, 1);
        --ripple-disable-transition: opacity 0.5s ease;
    }

    #ripple {
        border-radius: 50%;
        border-width: 0;
        margin-left: -100vmax;
        margin-top: -100vmax;
        height: 200vmax;
        width: 200vmax;
        overflow: hidden;
        background: var(--black);
        transform: scale(0);
        overflow: hidden;
    }

    #ripple.error {
        transition: var(--ripple-activating-transition);
        background: var(--mdc-theme-error)
    }

    #rippleShader {
        background: var(--white);
        opacity: 0;
        height: 100%;
        width: 100%;
    }

    #ripple.activating {
        transition: var(--ripple-activating-transition);
        transform: scale(1)
    }

    .activating #rippleShader {
        transition: var(--ripple-activating-transition);
        opacity: 1;
    }

    #ripple.disabling {
        transition: var(--ripple-disable-transition);
        opacity: 0;
    }

    #rippleContentWrapper {
        position: absolute;
        top: 100vmax;
        left: 100vmax;
        height: var(--window-height);
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #rippleContent {
        opacity: 0;
        text-align: center;
    }

    .activating-done #rippleContent {
        opacity: 1;
        transition: var(--ripple-activating-transition);
    }
`

export const myButtonStyle = css`
    vaadin-button {
        height: 100%;
        margin: 0;
        cursor: pointer;
        min-width: 80px;
        background-color: #03a9f4;
        color: white;
    }

    vaadin-button:hover {
        opacity: 0.8;
    }
`

export const mykeyPageStyles = css`
    * {
        --mdc-theme-primary: rgb(3, 169, 244);
        --mdc-theme-secondary: var(--mdc-theme-primary);
        --paper-input-container-focus-color: var(--mdc-theme-primary);
        --mdc-theme-surface: var(--white);
        --mdc-dialog-heading-ink-color: var(--black);
        --mdc-dialog-content-ink-color: var(--black);
        --lumo-primary-text-color: rgb(0, 167, 245);
        --lumo-primary-color-50pct: rgba(0, 167, 245, 0.5);
        --lumo-primary-color-10pct: rgba(0, 167, 245, 0.1);
        --lumo-primary-color: hsl(199, 100%, 48%);
        --lumo-base-color: var(--white);
        --lumo-body-text-color: var(--black);
        --_lumo-grid-border-color: var(--border);
        --_lumo-grid-secondary-border-color: var(--border2);
    }

    .red {
        --mdc-theme-primary: red;
    }
`

export const settingsPageStyles = css`
    * {
        --mdc-theme-primary: var(--login-button);
        --mdc-theme-secondary: var(--mdc-theme-primary);
        --mdc-dialog-content-ink-color: var(--black);
        --mdc-theme-surface: var(--white);
        --mdc-theme-text-primary-on-background: var(--black);
        --mdc-dialog-min-width: 300px;
        --mdc-dialog-max-width: 650px;
        --mdc-dialog-max-height: 700px;
        --mdc-list-item-text-width: 100%;
    }

    #main {
        width: 210px;
        display: flex;
        align-items: center;
    }

    .globe {
        color: var(--black);
        --mdc-icon-size: 36px;
    }

    span.name {
        display: inline-block;
        width: 150px;
        font-weight: 600;
        color: var(--general-color-blue);
        border: 1px solid transparent;
    }

    .red {
        --mdc-theme-primary: red;
    }

    .buttonred {
        color: #f44336;
    }

    .buttongreen {
        color: #03c851;
    }

    .buttonBlue {
        color: var(--general-color-blue);
    }

    .floatleft {
        float: left;
    }

    .floatright {
        float: right;
    }

    .list-parent {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }

    #customSelect {
        position: relative;
        border: 1px solid #ccc;
        cursor: pointer;
        background: var(--plugback);
    }

    #customSelect .selected {
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    #customSelect ul {
        position: absolute;
        top: 100%;
        left: 0;
        list-style: none;
        margin: 0;
        padding: 0;
        border: 1px solid #ccc;
        display: none;
        background: var(--plugback);
        width: 100%;
        box-sizing: border-box;
        z-index: 10;
    }

    #customSelect ul.open {
        display: block;
    }

    #customSelect ul li {
        padding: 10px;
        transition: 0.2s all;
    }

    #customSelect ul li:hover {
        background-color: var(--graylight);
    }

    .selected-left-side {
        display: flex;
        align-items: center;
    }
`

export const sideMenuStyles = css`
    nav {
        padding: 0;
    }

    :host {
        list-style: none;
        width: 100%;
        position: relative;
    }

    :host([compact]) {
        width: auto;
    }
`

export const sideMenuItemStyles = css`
    :host {
        --font-family: "Roboto", sans-serif;
        --item-font-size: 0.9375rem;
        --sub-item-font-size: 0.75rem;
        --item-padding: 0.875rem;
        --item-content-padding: 0.875rem;
        --icon-height: 1.125rem;
        --icon-width: 1.125rem;
        --item-border-radius: 5px;
        --item-selected-color: #dddddd;
        --item-selected-color-text: #333333;
        --item-color-active: #d1d1d1;
        --item-color-hover: #eeeeee;
        --item-text-color: #080808;
        --item-icon-color: #080808;
        --item-border-color: #eeeeee;
        --item-border-selected-color: #333333;

        --overlay-box-shadow: 0 2px 4px -1px hsla(214, 53%, 23%, 0.16), 0 3px 12px -1px hsla(214, 50%, 22%, 0.26);
        --overlay-background-color: #ffffff;

        --spacing: 4px;

        font-family: var(--font-family);
        display: flex;
        overflow: hidden;
        flex-direction: column;
        border-radius: var(--item-border-radius);
    }

    #itemLink {
        align-items: center;
        font-size: var(--item-font-size);
        font-weight: 400;
        height: var(--icon-height);
        transition: background-color 200ms;
        padding: var(--item-padding);
        cursor: pointer;
        display: inline-flex;
        flex-grow: 1;
        align-items: center;
        overflow: hidden;
        text-decoration: none;
        border-bottom: 1px solid var(--item-border-color);
        text-transform: uppercase;
    }

    .hideItem {
        display: none !important;
    }

    #itemLink:hover {
        background-color: var(--item-color-hover);
    }

    #itemLink:active {
        background-color: var(--item-color-active);
    }

    #content {
        padding-left: var(--item-content-padding);
        flex: 1;
    }

    :host([compact]) #content {
        padding-left: 0;
        display: none;
    }

    :host([selected]) #itemLink {
        background-color: var(--item-selected-color);
        color: var(--item-selected-color-text);
        border-left: 3px solid var(--item-border-selected-color);
    }

    :host([selected]) slot[name="icon"]::slotted(*) {
        color: var(--item-selected-color-text);
    }

    :host(:not([selected])) #itemLink {
        color: var(--item-text-color);
    }

    :host([expanded]) {
        background-color: var(--item-selected-color);
    }

    :host([hasSelectedChild]) {
        background-color: var(--item-selected-color);
    }

    :host span {
        cursor: inherit;
        overflow: hidden;
        text-overflow: ellipsis;
        user-select: none;
        -webkit-user-select: none;
        white-space: nowrap;
    }

    slot[name="icon"]::slotted(*) {
        flex-shrink: 0;
        color: var(--item-icon-color);
        height: var(--icon-height);
        width: var(--icon-width);
        pointer-events: none;
    }

    #collapse-button {
        float: right;
    }

    :host([compact]) #itemLink[level]:not([level="0"]) {
        padding: calc(var(--item-padding) / 2);
    }

    :host(:not([compact])) #itemLink[level]:not([level="0"]) {
        padding-left: calc(var(--icon-width) + var(--item-content-padding));
    }

    #itemLink[level]:not([level="0"]) #content {
        display: block;
        visibility: visible;
        width: auto;
        font-weight: 400;
        font-size: var(--sub-item-font-size)
    }

    #overlay {
        display: block;
        left: 101%;
        min-width: 200px;
        padding: 4px 2px;
        background-color: var(--overlay-background-color);
        background-image: var(--overlay-background-image, none);
        box-shadow: var(--overlay-box-shadow);
        border: 1px solid var(--overlay-background-color);
        border-left: 0;
        border-radius: 0 3px 3px 0;
        position: absolute;
        z-index: 1;
        animation: pop 200ms forwards;
    }

    @keyframes pop {
        0% {
            transform: translateX(-5px);
            opacity: 0.5;
        }

        100% {
            transform: translateX(0);
            opacity: 1;
        }
    }
`