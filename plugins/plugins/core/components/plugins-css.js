import { css } from 'lit'

export const chatpageStyles = css`
    html {
        scroll-behavior: smooth;
    }

    .chat-head-container {
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        height: 50vh;
        overflow-y: auto;
        overflow-x: hidden;
        width: 100%;
    }

    .repliedTo-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 10px 10px 8px 10px;
    }

    .senderName {
        margin: 0;
        color: var(--mdc-theme-primary);
        font-weight: bold;
        user-select: none;
    }

    .original-message {
        color: var(--chat-bubble-msg-color);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        margin: 0;
        width: 800px;
    }

    .close-icon {
        color: #676b71;
        width: 18px;
        transition: all 0.1s ease-in-out;
    }

    .close-icon:hover {
        cursor: pointer;
        color: #494c50;
    }

    .chat-text-area .typing-area .chatbar {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: auto;
        padding: 5px 5px 5px 7px;
        overflow: hidden;
    }

    .chat-text-area .typing-area .emoji-button {
        width: 45px;
        height: 40px;
        padding-top: 4px;
        border: none;
        outline: none;
        background: transparent;
        cursor: pointer;
        max-height: 40px;
        color: var(--black);
    }

    .emoji-button-caption {
        width: 45px;
        height: 40px;
        padding-top: 4px;
        border: none;
        outline: none;
        background: transparent;
        cursor: pointer;
        max-height: 40px;
        color: var(--black);
    }

    .caption-container {
        width: 100%;
        display: flex;
        height: auto;
        overflow: hidden;
        justify-content: center;
        background-color: var(--white);
        padding: 5px;
        border-radius: 1px;
    }

    .chatbar-caption {
        font-family: Roboto, sans-serif;
        width: 70%;
        margin-right: 10px;
        outline: none;
        align-items: center;
        font-size: 18px;
        resize: none;
        border-top: 0;
        border-right: 0;
        border-left: 0;
        border-bottom: 1px solid #cac8c8;
        padding: 3px;
    }

    .message-size-container {
        display: flex;
        justify-content: flex-end;
        width: 100%;
    }

    .message-size {
        font-family: Roboto, sans-serif;
        font-size: 12px;
        color: black;
    }

    .lds-grid {
        width: 120px;
        height: 120px;
        position: absolute;
        left: 50%;
        top: 40%;
    }

    img {
        border-radius: 25%;
    }

    .dialogCustom {
        position: fixed;
        z-index: 10000;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        top: 10px;
        right: 20px;
        user-select: none;
    }

    .dialogCustomInner {
        min-width: 300px;
        height: 40px;
        background-color: var(--white);
        box-shadow: rgb(119 119 119 / 32%) 0px 4px 12px;
        padding: 10px;
        border-radius: 4px;
    }

    .dialogCustomInner ul {
        padding-left: 0px
    }

    .dialogCustomInner li {
        margin-bottom: 10px;
    }

    .marginLoader {
        margin-right: 8px;
    }

    .last-message-ref {
        position: absolute;
        font-size: 18px;
        top: -40px;
        right: 30px;
        width: 50;
        height: 50;
        z-index: 5;
        color: black;
        background-color: white;
        border-radius: 50%;
        transition: all 0.1s ease-in-out;
    }

    .last-message-ref:hover {
        cursor: pointer;
        transform: scale(1.1);
    }

    .arrow-down-icon {
        transform: scale(1.15);
    }

    .chat-container {
        display: grid;
        max-height: 100%;
    }

    .chat-text-area {
        display: flex;
        position: relative;
        justify-content: center;
        min-height: 60px;
        max-height: 100%;
    }

    .chat-text-area .typing-area {
        display: flex;
        flex-direction: column;
        width: 98%;
        box-sizing: border-box;
        margin-bottom: 8px;
        border: 1px solid var(--chat-bubble-bg);
        border-radius: 10px;
        background: var(--chat-bubble-bg);
    }

    .chat-text-area .typing-area textarea {
        display: none;
    }

    .chat-text-area .typing-area .chat-editor {
        display: flex;
        max-height: -webkit-fill-available;
        width: 100%;
        border-color: transparent;
        margin: 0;
        padding: 0;
        border: none;
    }

    .repliedTo-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 10px 10px 8px 10px;
    }

    .repliedTo-subcontainer {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 15px;
        width: 100%;
    }

    .repliedTo-message {
        display: flex;
        flex-direction: column;
        gap: 5px;
        width: 100%;
        word-break: break-all;
        text-overflow: ellipsis;
        overflow: hidden;
        max-height: 60px;
    }

    .repliedTo-message p {
        margin: 0px;
        padding: 0px;
    }

    .repliedTo-message pre {
        white-space: pre-wrap;
    }

    .repliedTo-message p mark {
        background-color: #ffe066;
        border-radius: 0.25em;
        box-decoration-break: clone;
        padding: 0.125em 0;
    }

    .reply-icon {
        width: 20px;
        color: var(--mdc-theme-primary);
    }

    .close-icon {
        color: #676b71;
        width: 18px;
        transition: all 0.1s ease-in-out;
    }

    .close-icon:hover {
        cursor: pointer;
        color: #494c50;
    }

    .chatbar-container {
        width: 100%;
        display: flex;
        height: auto;
        overflow: hidden;
    }

    .lds-grid {
        width: 120px;
        height: 120px;
        position: absolute;
        left: 50%;
        top: 40%;
    }

    .lds-grid div {
        position: absolute;
        width: 34px;
        height: 34px;
        border-radius: 50%;
        background: #03a9f4;
        animation: lds-grid 1.2s linear infinite;
    }

    .lds-grid div:nth-child(1) {
        top: 4px;
        left: 4px;
        animation-delay: 0s;
    }

    .lds-grid div:nth-child(2) {
        top: 4px;
        left: 48px;
        animation-delay: -0.4s;
    }

    .lds-grid div:nth-child(3) {
        top: 4px;
        left: 90px;
        animation-delay: -0.8s;
    }

    .lds-grid div:nth-child(4) {
        top: 50px;
        left: 4px;
        animation-delay: -0.4s;
    }

    .lds-grid div:nth-child(5) {
        top: 50px;
        left: 48px;
        animation-delay: -0.8s;
    }

    .lds-grid div:nth-child(6) {
        top: 50px;
        left: 90px;
        animation-delay: -1.2s;
    }

    .lds-grid div:nth-child(7) {
        top: 95px;
        left: 4px;
        animation-delay: -0.8s;
    }

    .lds-grid div:nth-child(8) {
        top: 95px;
        left: 48px;
        animation-delay: -1.2s;
    }

    .lds-grid div:nth-child(9) {
        top: 95px;
        left: 90px;
        animation-delay: -1.6s;
    }

    @keyframes lds-grid {

        0%,
        100% {
            opacity: 1;
        }

        50% {
            opacity: 0.5;
        }
    }

    .float-left {
        float: left;
    }

    img {
        border-radius: 25%;
    }

    paper-dialog.warning {
        width: 50%;
        max-width: 50vw;
        height: 30%;
        max-height: 30vh;
        text-align: center;
        background-color: var(--white);
        color: var(--black);
        border: 1px solid var(--black);
        border-radius: 15px;
        line-height: 1.6;
        overflow-y: auto;
        overflow-x: hidden;
        width: 100%;
    }

    .repliedTo-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 10px 10px 8px 10px;
    }

    .senderName {
        margin: 0;
        color: var(--mdc-theme-primary);
        font-weight: bold;
        user-select: none;
    }

    .original-message {
        color: var(--chat-bubble-msg-color);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        margin: 0;
        width: 800px;
    }


    .close-icon {
        color: #676b71;
        width: 18px;
        transition: all 0.1s ease-in-out;
    }

    .close-icon:hover {
        cursor: pointer;
        color: #494c50;
    }

    .chat-text-area .typing-area .chatbar {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: auto;
        padding: 5px 5px 5px 7px;
        overflow: hidden;
    }

    .chat-text-area .typing-area .emoji-button {
        width: 45px;
        height: 40px;
        padding-top: 4px;
        border: none;
        outline: none;
        background: transparent;
        cursor: pointer;
        max-height: 40px;
        color: var(--black);
    }

    .emoji-button-caption {
        width: 45px;
        height: 40px;
        padding-top: 4px;
        border: none;
        outline: none;
        background: transparent;
        cursor: pointer;
        max-height: 40px;
        color: var(--black);
    }

    .caption-container {
        width: 100%;
        display: flex;
        height: auto;
        overflow: hidden;
        justify-content: center;
        background-color: var(--white);
        padding: 5px;
        border-radius: 1px;
    }

    .chatbar-caption {
        font-family: Roboto, sans-serif;
        width: 70%;
        margin-right: 10px;
        outline: none;
        align-items: center;
        font-size: 18px;
        resize: none;
        border-top: 0;
        border-right: 0;
        border-left: 0;
        border-bottom: 1px solid #cac8c8;
        padding: 3px;
    }

    .message-size-container {
        display: flex;
        justify-content: flex-end;
        width: 100%;
    }

    .message-size {
        font-family: Roboto, sans-serif;
        font-size: 12px;
        color: black;
    }

    .lds-grid {
        width: 120px;
        height: 120px;
        position: absolute;
        left: 50%;
        top: 40%;
    }

    img {
        border-radius: 25%;
    }

    .dialogCustom {
        position: fixed;
        z-index: 10000;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        top: 10px;
        right: 20px;
        user-select: none;
    }

    .dialogCustomInner {
        min-width: 300px;
        height: 40px;
        background-color: var(--white);
        box-shadow: rgb(119 119 119 / 32%) 0px 4px 12px;
        padding: 10px;
        border-radius: 4px;
    }

    .dialogCustomInner ul {
        padding-left: 0px
    }

    .dialogCustomInner li {
        margin-bottom: 10px;
    }

    .marginLoader {
        margin-right: 8px;
    }

    .last-message-ref {
        position: absolute;
        font-size: 18px;
        top: -40px;
        right: 30px;
        width: 50;
        height: 50;
        z-index: 5;
        color: black;
        background-color: white;
        border-radius: 50%;
        transition: all 0.1s ease-in-out;
    }

    .last-message-ref:hover {
        cursor: pointer;
        transform: scale(1.1);
    }

    .arrow-down-icon {
        transform: scale(1.15);
    }

    .chat-container {
        display: grid;
        max-height: 100%;
    }

    .chat-text-area {
        display: flex;
        position: relative;
        justify-content: center;
        min-height: 60px;
        max-height: 100%;
    }

    .chat-text-area .typing-area {
        display: flex;
        flex-direction: column;
        width: 98%;
        box-sizing: border-box;
        margin-bottom: 8px;
        border: 1px solid var(--chat-bubble-bg);
        border-radius: 10px;
        background: var(--chat-bubble-bg);
    }

    .chat-text-area .typing-area textarea {
        display: none;
    }

    .chat-text-area .typing-area .chat-editor {
        display: flex;
        max-height: -webkit-fill-available;
        width: 100%;
        border-color: transparent;
        margin: 0;
        padding: 0;
        border: none;
    }

    .repliedTo-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 10px 10px 8px 10px;
    }

    .repliedTo-subcontainer {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 15px;
        width: 100%;
    }

    .repliedTo-message {
        display: flex;
        flex-direction: column;
        gap: 5px;
        width: 100%;
        word-break: break-all;
        text-overflow: ellipsis;
        overflow: hidden;
        max-height: 60px;
    }

    .repliedTo-message p {
        margin: 0px;
        padding: 0px;
    }

    .repliedTo-message pre {
        white-space: pre-wrap;
    }

    .repliedTo-message p mark {
        background-color: #ffe066;
        border-radius: 0.25em;
        box-decoration-break: clone;
        padding: 0.125em 0;
    }

    .reply-icon {
        width: 20px;
        color: var(--mdc-theme-primary);
    }

    .close-icon {
        color: #676b71;
        width: 18px;
        transition: all 0.1s ease-in-out;
    }

    .close-icon:hover {
        cursor: pointer;
        color: #494c50;
    }

    .chatbar-container {
        width: 100%;
        display: flex;
        height: auto;
        overflow: hidden;
    }

    .lds-grid {
        width: 120px;
        height: 120px;
        position: absolute;
        left: 50%;
        top: 40%;
    }

    .lds-grid div {
        position: absolute;
        width: 34px;
        height: 34px;
        border-radius: 50%;
        background: #03a9f4;
        animation: lds-grid 1.2s linear infinite;
    }

    .lds-grid div:nth-child(1) {
        top: 4px;
        left: 4px;
        animation-delay: 0s;
    }

    .lds-grid div:nth-child(2) {
        top: 4px;
        left: 48px;
        animation-delay: -0.4s;
    }

    .lds-grid div:nth-child(3) {
        top: 4px;
        left: 90px;
        animation-delay: -0.8s;
    }

    .lds-grid div:nth-child(4) {
        top: 50px;
        left: 4px;
        animation-delay: -0.4s;
    }

    .lds-grid div:nth-child(5) {
        top: 50px;
        left: 48px;
        animation-delay: -0.8s;
    }

    .lds-grid div:nth-child(6) {
        top: 50px;
        left: 90px;
        animation-delay: -1.2s;
    }

    .lds-grid div:nth-child(7) {
        top: 95px;
        left: 4px;
        animation-delay: -0.8s;
    }

    .lds-grid div:nth-child(8) {
        top: 95px;
        left: 48px;
        animation-delay: -1.2s;
    }

    .lds-grid div:nth-child(9) {
        top: 95px;
        left: 90px;
        animation-delay: -1.6s;
    }

    @keyframes lds-grid {

        0%,
        100% {
            opacity: 1;
        }

        50% {
            opacity: 0.5;
        }
    }

    .float-left {
        float: left;
    }

    img {
        border-radius: 25%;
    }

    paper-dialog.warning {
        width: 50%;
        max-width: 50vw;
        height: 30%;
        max-height: 30vh;
        text-align: center;
        background-color: var(--white);
        color: var(--black);
        border: 1px solid var(--black);
        border-radius: 15px;
        line-height: 1.6;
        overflow-y: auto;
    }

    .buttons {
        text-align: right;
    }

    .dialogCustom {
        position: fixed;
        z-index: 10000;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        top: 10px;
        right: 20px;
        user-select: none;
    }

    .dialogCustom p {
        color: var(--black)
    }

    .dialogCustomInner {
        min-width: 300px;
        height: 40px;
        background-color: var(--white);
        box-shadow: rgb(119 119 119 / 32%) 0px 4px 12px;
        padding: 10px;
        border-radius: 4px;
    }

    .dialogCustomInner ul {
        padding-left: 0px
    }

    .dialogCustomInner li {
        margin-bottom: 10px;
    }

    .marginLoader {
        margin-right: 8px;
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
        font-size: 10px;
        position: relative;
        text-indent: -9999em;
        transform: translateZ(0px);
        animation: 1.1s linear 0s infinite normal none running loadingAnimation;
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

    /* Add Image Modal Dialog Styling */

    .dialog-container {
        position: relative;
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 0 10px;
        gap: 10px;
        height: 100%;
    }

    .dialog-container-title {
        font-family: Montserrat;
        color: var(--black);
        font-size: 20px;
        margin: 15px 0 0 0;
    }

    .divider {
        height: 1px;
        background-color: var(--chat-bubble-msg-color);
        user-select: none;
        width: 70%;
        margin-bottom: 20px;
    }

    .dialog-container-loader {
        position: relative;
        display: flex;
        align-items: center;
        padding: 0 10px;
        gap: 10px;
        height: 100%;
    }

    .dialog-image {
        width: 100%;
        max-height: 300px;
        border-radius: 0;
        object-fit: contain;
    }

    .chat-right-panel {
        flex: 0;
        border-left: 3px solid rgb(221, 221, 221);
        height: 100%;
        overflow-y: auto;
        background: transparent;
    }

    .movedin {
        flex: 1 !important;
        background: transparent;
    }

    .main-container {
        display: flex;
        height: 100%;
    }

    .group-nav-container {
        display: flex;
        height: 40px;
        padding: 5px;
        margin: 0px;
        background-color: var(--chat-bubble-bg);
        box-sizing: border-box;
        align-items: center;
        justify-content: space-between;
        box-shadow: var(--group-drop-shadow);
        z-index: 1;
    }

    .top-bar-icon {
        border-radius: 50%;
        color: var(--chat-bubble-msg-color);
        transition: 0.3s all ease-in-out;
        padding: 5px;
        background-color: transparent;
    }

    .top-bar-icon:hover {
        background-color: #e6e6e69b;
        cursor: pointer;
        color: var(--black)
    }

    .group-name {
        font-family: Raleway, sans-serif;
        font-size: 16px;
        color: var(--black);
        margin: 0px;
        padding: 0px;
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
        color: #F44336;
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

    .name-input {
        width: 100%;
        margin-bottom: 15px;
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

    .search-results-div {
        position: absolute;
        top: 25px;
        right: 25px;
    }

    .search-field {
        width: 100%;
        position: relative;
        margin-bottom: 5px;
    }

    .search-icon {
        position: absolute;
        right: 3px;
        top: 0;
        color: var(--chat-bubble-msg-color);
        transition: all 0.3s ease-in-out;
        background: none;
        border-radius: 50%;
        padding: 6px 3px;
        font-size: 21px;
    }

    .search-icon:hover {
        cursor: pointer;
        background: #d7d7d75c;
    }

    .user-verified {
        position: absolute;
        top: 0;
        right: 5px;
        display: flex;
        align-items: center;
        gap: 10px;
        color: #04aa2e;
        font-size: 13px;
    }

    .user-selected {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0;
        box-shadow: rgb(0 0 0 / 16%) 0px 3px 6px, rgb(0 0 0 / 23%) 0px 3px 6px;
        padding: 18px 20px;
        color: var(--chat-bubble-msg-color);
        border-radius: 5px;
        background-color: #ececec96;
    }

    .user-selected-name {
        font-family: Roboto, sans-serif;
        margin: 0;
        font-size: 16px;
    }

    .forwarding-container {
        display: flex;
        gap: 15px;
    }

    .user-selected-forwarding {
        font-family: Livvic, sans-serif;
        margin: 0;
        font-size: 16px;
    }

    .close-forwarding {
        color: #676b71;
        width: 14px;
        transition: all 0.1s ease-in-out;
    }

    .close-forwarding:hover {
        cursor: pointer;
        color: #4e5054;
    }

    .chat-gifs {
        position: absolute;
        right: 15px;
        bottom: 100px;
        justify-self: flex-end;
        width: fit-content;
        height: auto;
        transform: translateY(30%);
        animation: smooth-appear 0.5s ease forwards;
        z-index: 5;
    }

    @keyframes smooth-appear {
        to {
            transform: translateY(0);
        }
    }

    .gifs-backdrop {
        top: 0;
        height: 100vh;
        width: 100vw;
        background: transparent;
        position: fixed;
    }

    .modal-button-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }

    .attachment-icon-container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 120px;
        width: 120px;
        border-radius: 50%;
        border: none;
        background-color: var(--mdc-theme-primary);
    }

    .attachment-icon {
        width: 70%;
    }

    .attachment-name {
        font-family: Work Sans, sans-serif;
        font-size: 20px;
        color: var(--chat-bubble-msg-color);
        margin: 0px;
        letter-spacing: 1px;
        padding: 5px 0px;
    }
`

export const wrapperModalStyles = css`
    .backdrop {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background: rgb(186 186 186 / 26%);
        overflow: hidden;
        animation: backdrop_blur cubic-bezier(0.22, 1, 0.36, 1) 1s forwards;
        z-index: 50
    }

    .modal-body {
        height: auto;
        position: fixed;
        box-shadow: rgb(60 64 67 / 30%) 0px 1px 2px 0px, rgb(60 64 67 / 15%) 0px 2px 6px 2px;
        width: 500px;
        z-index: 5;
        display: flex;
        flex-direction: column;
        padding: 15px;
        background-color: var(--white);
        left: 50%;
        top: 0px;
        transform: translate(-50%, 10%);
        border-radius: 12px;
        overflow-y: auto;
        animation: 1s cubic-bezier(0.22, 1, 0.36, 1) 0s 1 normal forwards running modal_transition;
        max-height: 80%;
        z-index: 60
    }

    @keyframes backdrop_blur {
        0% {
            backdrop-filter: blur(0px);
            background: transparent;
        }

        100% {
            backdrop-filter: blur(5px);
            background: rgb(186 186 186 / 26%);
        }
    }

    @keyframes modal_transition {
        0% {
            visibility: hidden;
            opacity: 0;
        }

        100% {
            visibility: visible;
            opacity: 1;
        }
    }
`

export const tipUserStyles = css`
    .tip-user-header {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 12px;
        border-bottom: 1px solid whitesmoke;
        gap: 25px;
        user-select: none;
    }

    .tip-user-header-font {
        font-family: Montserrat, sans-serif;
        font-size: 20px;
        color: var(--chat-bubble-msg-color);
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .tip-user-body {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px 10px;
        flex-direction: column;
        gap: 25px;
    }

    .tip-input {
        width: 300px;
        margin-bottom: 15px;
        outline: 0;
        border-width: 0 0 2px;
        border-color: var(--mdc-theme-primary);
        background-color: transparent;
        padding: 10px;
        font-family: Roboto, sans-serif;
        font-size: 15px;
        color: var(--chat-bubble-msg-color);
    }

    .tip-input::selection {
        background-color: var(--mdc-theme-primary);
        color: white;
    }

    .tip-input::placeholder {
        opacity: 0.9;
        color: var(--black);
    }

    .tip-available {
        font-family: Roboto, sans-serif;
        font-size: 17px;
        color: var(--chat-bubble-msg-color);
        font-weight: 300;
        letter-spacing: 0.3px;
        margin: 0;
        user-select: none;
    }

    .success-msg {
        font-family: Roboto, sans-serif;
        font-size: 18px;
        font-weight: 400;
        letter-spacing: 0.3px;
        margin: 0;
        user-select: none;
        color: #10880b;
    }

    .error-msg {
        font-family: Roboto, sans-serif;
        font-size: 18px;
        font-weight: 400;
        letter-spacing: 0.3px;
        margin: 0;
        user-select: none;
        color: #f30000;
    }
`

export const chatSearchResultsStyles = css`
    .chat-results-card {
        position: relative;
        padding: 25px 20px;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        width: 300px;
        min-height: 200px;
        height: auto;
        border-radius: 5px;
        background-color: var(--white);
    }

    .chat-result-header {
        color: var(--chat-bubble-msg-color);
        font-size: 18px;
        font-family: Montserrat, sans-serif;
        text-align: center;
        margin: 0 0 10px 0;
        user-select: none;
    }

    .divider {
        height: 1px;
        background: var(--chat-bubble-msg-color);
        margin: 0 40px;
        user-select: none;
    }

    .no-results {
        font-family: Roboto, sans-serif;
        font-weight: 300;
        letter-spacing: 0.3px;
        font-size: 16px;
        color: var(--chat-bubble-msg-color);
        text-align: center;
        margin: 20px 0 0 0;
        user-select: none;
    }

    .chat-result-container {
        height: 200px;
        overflow-y: auto;
        padding: 0 10px;
    }

    .chat-result-container::-webkit-scrollbar-track {
        background-color: whitesmoke;
        border-radius: 7px;
    }

    .chat-result-container::-webkit-scrollbar {
        width: 6px;
        border-radius: 7px;
        background-color: whitesmoke;
    }

    .chat-result-container::-webkit-scrollbar-thumb {
        background-color: rgb(180, 176, 176);
        border-radius: 7px;
        transition: all 0.3s ease-in-out;
    }

    .chat-result-container::-webkit-scrollbar-thumb:hover {
        background-color: rgb(148, 146, 146);
        cursor: pointer;
    }

    .chat-result-card {
        padding: 12px;
        margin-bottom: 15px;
        margin-top: 15px;
        transition: all 0.2s ease-in-out;
        box-shadow: none;
    }

    .chat-result-card:active {
        background-color: #09b814;
    }

    .chat-result-card:hover {
        cursor: pointer;
        border: none;
        border-radius: 4px;
        box-sizing: border-box;
        -webkit-box-shadow: rgba(132, 132, 132, 40%) 0px 0px 6px -1px;
        box-shadow: rgba(132, 132, 132, 40%) 0px 0px 6px -1px;
    }

    .chat-result {
        font-family: Roboto, sans-serif;
        font-weight: 300;
        letter-spacing: 0.3px;
        font-size: 15px;
        color: var(--chat-bubble-msg-color);
        margin: 0;
        user-select: none;
    }

    .spinner-container {
        display: flex;
        width: 100%;
        justify-content: center
    }

    .close-icon {
        position: absolute;
        top: 5px;
        right: 5px;
        color: var(--chat-bubble-msg-color);
        font-size: 14px;
        transition: all 0.1s ease-in-out;
    }

    .close-icon:hover {
        cursor: pointer;
        font-size: 15px;
    }
`

export const chatStyles = css`
    html {
        --scrollbarBG: #a1a1a1;
        --thumbBG: #6a6c75;
    }

    *::-webkit-scrollbar {
        width: 11px;
    }

    * {
        scrollbar-width: thin;
        scrollbar-color: var(--thumbBG) var(--scrollbarBG);
        --mdc-theme-primary: rgb(3, 169, 244);
        --mdc-theme-secondary: var(--mdc-theme-primary);
        --mdc-dialog-max-width: 85vw;
        --mdc-dialog-max-height: 95vh;
    }

    * :focus-visible {
        outline: none;
    }

    *::-webkit-scrollbar-track {
        background: var(--scrollbarBG);
    }

    *::-webkit-scrollbar-thumb {
        background-color: var(--thumbBG);
        border-radius: 6px;
        border: 3px solid var(--scrollbarBG);
    }

    a {
        color: var(--black);
        text-decoration: none;
    }

    ul {
        list-style: none;
        margin: 0;
        padding: 20px 17px;
    }

    .message-sending {
        opacity: 0.5;
        cursor: progress;
    }

    .chat-list {
        overflow-y: auto;
        overflow-x: hidden;
        height: 96%;
        box-sizing: border-box;
    }

    .message-data {
        width: 92%;
        margin-bottom: 15px;
        margin-left: 55px;
    }

    .message-data-name {
        user-select: none;
        color: var(--qchat-name);
        margin-bottom: 5px;
    }

    .forwarded-text {
        user-select: none;
        color: var(--general-color-blue);
        margin-bottom: 5px;
    }

    .message-data-forward {
        user-select: none;
        color: var(--mainmenutext);
        margin-bottom: 5px;
        font-size: 12px;
    }

    .message-data-my-name {
        color: var(--qchat-my-name);
        font-weight: bold;
    }

    .message-data-time {
        color: #888888;
        font-size: 13px;
        user-select: none;
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding-top: 2px;
    }

    .message-data-time-hidden {
        visibility: hidden;
        transition: all 0.1s ease-in-out;
        color: #888888;
        font-size: 13px;
        user-select: none;
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding-top: 2px;
    }

    .message-user-info {
        display: flex;
        justify-content: space-between;
        width: 100%;
        gap: 10px;
    }

    .chat-bubble-container {
        display: flex;
        gap: 7px;
    }

    .message-container {
        position: relative;
    }

    .message-subcontainer1 {
        position: relative;
        display: flex;
        align-items: flex-end;
    }

    .message-subcontainer2 {
        position: relative;
        display: flex;
        background-color: var(--chat-bubble-bg);
        flex-grow: 0;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        border-radius: 5px;
        padding: 12px 15px 4px 15px;
        width: fit-content;
        min-width: 150px;
    }


    .message-myBg {
        background-color: var(--chat-bubble-myBg) !important;
    }

    .message-triangle {
        position: relative;
    }

    .message-triangle:after {
        content: "";
        position: absolute;
        bottom: 0px;
        left: -9px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0px 0px 7px 9px;
        border-color: transparent transparent var(--chat-bubble-bg) transparent;
    }

    .message-myTriangle {
        position: relative;
    }

    .message-myTriangle:after {
        content: "";
        position: absolute;
        bottom: 0px;
        left: -9px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0px 0px 7px 9px;
        border-color: transparent transparent var(--chat-bubble-myBg) transparent;
    }

    .message-reactions {
        background-color: transparent;
        width: calc(100% - 54px);
        margin-left: 54px;
        display: flex;
        flex-flow: row wrap;
        justify-content: left;
        gap: 8px;
    }

    .original-message {
        position: relative;
        display: flex;
        flex-direction: column;
        color: var(--chat-bubble-msg-color);
        line-height: 19px;
        user-select: text;
        font-size: 15px;
        width: 90%;
        border-radius: 5px;
        padding: 8px 5px 8px 25px;
        margin-bottom: 10px;
        cursor: pointer;
    }

    .original-message:before {
        content: "";
        position: absolute;
        top: 5px;
        left: 10px;
        height: 75%;
        width: 2.6px;
        background-color: var(--mdc-theme-primary);
    }

    .original-message-sender {
        color: var(--mdc-theme-primary);
    }

    .replied-message {
        margin: 0;
        padding: 0;
    }

    .replied-message p {
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 500px;
        max-height: 40px;
        margin: 0;
        padding: 0;
    }

    .message {
        display: flex;
        flex-direction: column;
        color: var(--chat-bubble-msg-color);
        line-height: 19px;
        overflow-wrap: anywhere;
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        user-select: text;
        font-size: 16px;
        width: 100%;
        position: relative;
    }

    .message-data-avatar {
        margin: 0px 10px 0px 3px;
        width: 42px;
        height: 42px;
        float: left;
    }

    .message-parent {
        padding: 3px;
        background: rgba(245, 245, 245, 0);
    }

    .message-parent:hover {
        background: var(--chat-bubble);
        border-radius: 8px;
    }

    .message-parent:hover .chat-hover {
        display: block;
    }

    .message-parent:hover .message-data-time-hidden {
        visibility: visible;
    }

    .chat-hover {
        display: none;
        position: absolute;
        top: -25px;
        right: 5px;
    }

    .emoji {
        width: 1.7em;
        height: 1.5em;
        margin-bottom: -2px;
        vertical-align: bottom;
        object-fit: contain;
    }

    .align-left {
        text-align: left;
    }

    .align-right {
        text-align: right;
    }

    .float-left {
        float: left;
    }

    .float-right {
        float: right;
    }

    .clearfix:after {
        visibility: hidden;
        display: block;
        font-size: 0;
        content: " ";
        clear: both;
        height: 0;
    }

    img {
        border-radius: 25%;
    }

    .container {
        display: flex;
        flex-direction: row;
        align-items: center;
        background-color: var(--chat-menu-bg);
        border: 1px solid var(--chat-menu-outline);
        border-radius: 5px;
        height: 100%;
        position: relative;
    }

    .container:focus-visible {
        outline: none;
    }

    .menu-icon {
        width: 100%;
        padding: 5px 7px;
        display: flex;
        align-items: center;
        font-size: 13px;
        color: var(--chat-menu-icon);
    }

    .menu-icon:hover {
        border-radius: 5px;
        background-color: var(--chat-menu-icon-hover);
        transition: all 0.1s ease-in-out;
        cursor: pointer;
    }

    .tooltip {
        position: relative;
    }

    .tooltip:before {
        content: attr(data-text);
        display: none;
        position: absolute;
        top: -47px;
        left: 50%;
        transform: translateX(-50%);
        width: auto;
        padding: 10px;
        border-radius: 10px;
        background: #fff;
        color: #000;
        text-align: center;
        font-size: 12px;
        z-index: 5;
        white-space: nowrap;
        overflow: hidden;
    }

    .tooltip:hover:before {
        display: block;
    }

    .tooltip:after {
        content: "";
        position: absolute;
        margin-top: -7px;
        top: -7px;
        border: 10px solid #fff;
        border-color: white transparent transparent transparent;
        z-index: 5;
        display: none;
    }

    .tooltip:hover:before,
    .tooltip:hover:after {
        display: block;
    }

    .block-user-container {
        display: block;
        position: absolute;
        left: -5px;
    }

    .block-user {
        width: 100%;
        padding: 5px 7px;
        display: flex;
        align-items: center;
        font-size: 13px;
        color: var(--chat-menu-icon);
        justify-content: space-evenly;
        border: 1px solid rgb(218, 217, 217);
        border-radius: 5px;
        background-color: var(--chat-menu-bg);
        width: 150px;
        height: 32px;
        padding: 3px 8px;
    }

    .block-user:hover {
        cursor: pointer;
        background-color: var(--block-user-bg-hover);
        transition: all 0.1s ease-in-out 0s;
    }

    .reactions-bg {
        position: relative;
        background-color: #d5d5d5;
        border-radius: 10px;
        padding: 5px;
        color: black;
        transition: all 0.1s ease-in-out;
        border: 0.5px solid transparent;
        cursor: pointer;
    }

    .reactions-bg:hover {
        border: 0.5px solid var(--reaction-bubble-outline);
    }

    .image-container {
        display: flex;
    }

    .message-data-level {
        height: 21px;
        width: auto;
        overflow: hidden;
    }

    .defaultSize {
        width: 45vh;
        height: 40vh;
    }

    .hideImg {
        visibility: hidden;
    }

    .image-deleted-msg {
        font-family: Roboto, sans-serif;
        font-size: 14px;
        font-style: italic;
        color: var(--chat-bubble-msg-color);
        margin: 0;
        padding-top: 10px;
    }

    .image-delete-icon {
        margin-left: 5px;
        height: 20px;
        cursor: pointer;
        visibility: hidden;
        transition: .2s all;
        opacity: 0.8;
        color: rgb(228, 222, 222);
        padding-left: 7px;
    }

    .image-delete-icon:hover {
        opacity: 1;
    }

    .message-parent:hover .image-delete-icon {
        visibility: visible;
    }

    .imageContainer {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }

    .spinnerContainer {
        display: flex;
        width: 100%;
        justify-content: center
    }

    .delete-image-msg {
        font-family: Livvic, sans-serif;
        font-size: 20px;
        color: var(--chat-bubble-msg-color);
        letter-spacing: 0.3px;
        font-weight: 300;
        text-align: center;
    }

    .modal-button-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
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
        color: #F44336;
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

    #messageContent p {
        margin: 0px;
        padding: 0px;
    }

    #messageContent p mark {
        background-color: #ffe066;
        border-radius: 0.25em;
        box-decoration-break: clone;
        padding: 0.125em 0;
    }

    #messageContent>*+* {
        outline: none;
    }

    #messageContent ul,
    ol {
        padding: 0 1rem;
    }

    #messageContent h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        line-height: 1.1;
    }

    #messageContent code {
        background-color: rgba(#616161, 0.1);
        color: #616161;
    }

    #messageContent pre {
        background: #0D0D0D;
        color: #FFF;
        font-family: 'JetBrainsMono', monospace;
        padding: 0.75rem 1rem;
        border-radius: 0.5rem;
        white-space: pre-wrap;
    }

    #messageContent pre code {
        color: inherit;
        padding: 0;
        background: none;
        font-size: 0.8rem;
    }


    #messageContent img {
        width: 1.7em;
        height: 1.5em;
        margin: 0px;

    }

    #messageContent blockquote {
        padding-left: 1rem;
        border-left: 2px solid rgba(#0D0D0D, 0.1);
    }

    #messageContent hr {
        border: none;
        border-top: 2px solid rgba(#0D0D0D, 0.1);
        margin: 2rem 0;
    }

    .replied-message p {
        margin: 0px;
        padding: 0px;
    }

    .replied-message>*+* {
        margin-top: 0.75em;
        outline: none;
    }

    .replied-message ul,
    ol {
        padding: 0 1rem;
    }

    .replied-message h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        line-height: 1.1;
    }

    .replied-message code {
        background-color: rgba(#616161, 0.1);
        color: #616161;
    }

    .replied-message pre {
        background: #0D0D0D;
        color: #FFF;
        font-family: 'JetBrainsMono', monospace;
        padding: 0.75rem 1rem;
        border-radius: 0.5rem;
        white-space: pre-wrap;
        margin: 0px;
    }

    .replied-message pre code {
        color: inherit;
        padding: 0;
        background: none;
        font-size: 0.8rem;
    }

    .replied-message img {
        width: 1.7em;
        height: 1.5em;
        margin: 0px;
    }

    .replied-message blockquote {
        padding-left: 1rem;
        border-left: 2px solid rgba(#0D0D0D, 0.1);
    }

    .replied-message hr {
        border: none;
        border-top: 2px solid rgba(#0D0D0D, 0.1);
        margin: 2rem 0;
    }

    .attachment-container {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        padding: 5px 0 10px 0;
        gap: 20px;
        cursor: pointer;
    }


    .attachment-icon-container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
        width: 50px;
        border-radius: 50%;
        border: none;
        background-color: var(--mdc-theme-primary);
    }

    .attachment-icon {
        width: 70%;
    }

    .attachment-info {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .attachment-name {
        font-family: Work Sans, sans-serif;
        font-size: 16px;
        color: var(--chat-bubble-msg-color);
        margin: 0;
        letter-spacing: 0.4px;
        padding: 5px 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .attachment-size {
        font-family: Roboto, sans-serif;
        font-size: 16px;
        color: var(--chat-bubble-msg-color);
        margin: 0;
        letter-spacing: 0.3px;
        font-weight: 300;
    }

    .download-icon {
        position: relative;
        color: var(--chat-bubble-msg-color);
        width: 19px;
        background-color: transparent;
    }

    .download-icon:hover::before {
        background-color: rgb(161 158 158 / 41%);
    }

    .download-icon::before {
        content: "";
        position: absolute;
        border-radius: 50%;
        padding: 18px;
        background-color: transparent;
        transition: all 0.3s ease-in-out;
    }

    .edited-message-style {
        font-family: "Work Sans", sans-serif;
        font-style: italic;
        font-size: 13px;
        visibility: visible;
    }

    .unread-divider {
        width: 100%;
        padding: 5px;
        color: var(--black);
        border-bottom: 1px solid var(--black);
        display: flex;
        justify-content: center;
        border-radius: 2px;
        margin-top: 5px;
    }

    .blink-bg {
        border-radius: 8px;
        animation: blinkingBackground 3s;
    }

    @keyframes blinkingBackground {
        0% {
            background-color: rgba(var(--menuactivergb), 1)
        }

        100% {
            background-color: rgba(var(--menuactivergb), 0)
        }
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

export const toolTipStyles = css`
    .tooltip {
        position: relative;
        display: inline-block;
        border-bottom: 1px dotted black;
    }

    .tooltiptext {
        margin-bottom: 100px;
        display: inline;
        visibility: visible;
        width: 120px;
        background-color: #555;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 5px 0;
        position: absolute;
        z-index: 1;
        bottom: 125%;
        left: 50%;
        margin-left: -60px;
        opacity: 1;
        transition: opacity 0.3s;
    }

    .tooltiptext::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: #555 transparent transparent transparent;
    }

    .hide-tooltip {
        display: none;
        visibility: hidden;
        opacity: 0;
    }
`

export const reusableImageStyles = css`
    * {
        --mdc-theme-text-primary-on-background: var(--black);
        --mdc-dialog-max-width: 85vw;
        --mdc-dialog-max-height: 95vh;
    }

    img {
        width: 100%;
        height: auto;
        object-fit: contain;
        border-radius: 5px;
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

    .imageContainer {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
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

export const nameMenuStyles = css`
    * {
        --mdc-theme-primary: rgb(3, 169, 244);
        --mdc-theme-secondary: var(--mdc-theme-primary);
        --mdc-dialog-content-ink-color: var(--black);
        --mdc-theme-surface: var(--white);
        --mdc-theme-text-primary-on-background: var(--black);
        --paper-input-container-focus-color: var(--mdc-theme-primary);
        --lumo-primary-text-color: rgb(0, 167, 245);
        --lumo-primary-color-50pct: rgba(0, 167, 245, 0.5);
        --lumo-primary-color-10pct: rgba(0, 167, 245, 0.1);
        --lumo-primary-color: hsl(199, 100%, 48%);
        --lumo-base-color: var(--white);
        --lumo-body-text-color: var(--black);
    }

    a {
        background-color: transparent;
        color: var(--black);
        text-decoration: none;
        display: inline;
        position: relative;
    }

    a:hover {
        background-color: transparent;
        color: var(--black);
        text-decoration: none;
        display: inline;
        position: relative;
    }

    a:after {
        content: '';
        position: absolute;
        width: 100%;
        transform: scaleX(0);
        height: 2px;
        bottom: 0;
        left: 0;
        background-color: #03a9f4;
        transform-origin: bottom right;
        transition: transform 0.25s ease-out;
    }

    a:hover:after {
        transform: scaleX(1);
        transform-origin: bottom left;
    }

    .block {}

    .red {
        --mdc-theme-primary: red;
    }

    h2 {
        margin: 0;
    }

    h2,
    h3,
    h4,
    h5 {
        color: var(--black);
        font-weight: 400;
    }

    .custom {
        --paper-tooltip-background: #03a9f4;
        --paper-tooltip-text-color: #fff;
    }

    .dropdown {
        position: relative;
        display: inline;
    }

    .dropdown a:hover {
        background-color: transparent;
    }

    .dropdown-content {
        display: none;
        position: absolute;
        bottom: 25px;
        left: 10px;
        background-color: var(--white);
        min-width: 200px;
        overflow: auto;
        border: 1px solid transparent;
        border-radius: 10px;
        box-shadow: var(--qchatshadow);
        z-index: 1;
    }

    .dropdown-content span {
        color: var(--nav-text-color);
        text-align: center;
        padding-top: 12px;
        display: block;
    }

    .dropdown-content a {
        color: var(--nav-text-color);
        padding: 12px 12px;
        text-decoration: none;
        display: block;
    }

    .dropdown-content a:hover {
        background-color: var(--nav-color-hover);
    }

    .showList {
        display: block;
    }

    .input {
        width: 90%;
        border: none;
        display: inline-block;
        font-size: 16px;
        padding: 10px 20px;
        border-radius: 5px;
        resize: none;
        background: #eee;
    }

    .textarea {
        width: 90%;
        border: none;
        display: inline-block;
        font-size: 16px;
        padding: 10px 20px;
        border-radius: 5px;
        height: 120px;
        resize: none;
        background: #eee;
    }
`

export const levelFounderStyles = css`
    * {
        --mdc-theme-primary: rgb(3, 169, 244);
        --mdc-theme-secondary: var(--mdc-theme-primary);
        --mdc-dialog-content-ink-color: var(--black);
        --mdc-theme-surface: var(--white);
        --mdc-theme-text-primary-on-background: var(--black);
        --paper-input-container-focus-color: var(--mdc-theme-primary);
        --lumo-primary-text-color: rgb(0, 167, 245);
        --lumo-primary-color-50pct: rgba(0, 167, 245, 0.5);
        --lumo-primary-color-10pct: rgba(0, 167, 245, 0.1);
        --lumo-primary-color: hsl(199, 100%, 48%);
        --lumo-base-color: var(--white);
        --lumo-body-text-color: var(--black);
    }

    h2 {
        margin: 0;
    }

    h2,
    h3,
    h4,
    h5 {
        color: var(--black);
        font-weight: 400;
    }

    .custom {
        --paper-tooltip-background: #03a9f4;
        --paper-tooltip-text-color: #fff;
    }

    .level-img-tooltip {
        --paper-tooltip-background: #000000;
        --paper-tooltip-text-color: #fff;
        --paper-tooltip-delay-in: 300;
        --paper-tooltip-delay-out: 3000;
    }

    .message-data {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
    }

    .message-data-level {
        width: 20px;
        height: 20px;
    }

    .badge {
        align-items: center;
        background: rgb(3, 169, 244);
        border: 1px solid transparent;
        border-radius: 50%;
        color: rgb(255, 255, 255);
        display: flex;
        font-size: 10px;
        font-weight: 400;
        height: 12px;
        width: 12px;
        justify-content: center;
        cursor: pointer;
    }
`

export const chatRightPanelResourcesStyles = css`
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
        flex: 0;
        align-items: center;
    }

    .container-body {
        width: 100%;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        overflow: auto;
        margin-top: 5px;
        padding: 0px 6px;
        box-sizing: border-box;
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

    .message-myBg {
        background-color: var(--chat-bubble-myBg) !important;
        margin-bottom: 15px;
        border-radius: 5px;
        padding: 5px;
    }

    .message-data-name {
        user-select: none;
        color: #03a9f4;
        margin-bottom: 5px;
    }

    .message-user-info {
        display: flex;
        justify-content: space-between;
        width: 100%;
        gap: 10px;
    }

    .hideImg {
        visibility: hidden;
    }

    .checkbox-row {
        position: relative;
        display: flex;
        align-items: center;
        align-content: center;
        font-family: Montserrat, sans-serif;
        font-weight: 600;
        color: var(--black);
        padding-left: 5px;
    }
`

export const imageParentStyles = css`
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
        flex: 0;
        gap: 20px;
        align-items: center;
    }

    .container-body {
        width: 100%;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        overflow: auto;
        margin-top: 5px;
        padding: 0px 6px;
        box-sizing: border-box;
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

    .message-myBg {
        background-color: var(--chat-bubble-myBg) !important;
        margin-bottom: 15px;
        border-radius: 5px;
        padding: 5px;
    }

    .message-data-name {
        user-select: none;
        color: #03a9f4;
        margin-bottom: 5px;
    }

    .message-user-info {
        display: flex;
        justify-content: space-between;
        width: 100%;
        gap: 10px;
    }

    .hideImg {
        visibility: hidden;
    }

    .image-container {
        display: flex;
    }

    .repost-btn {
        margin-top: 4px;
        max-height: 28px;
        padding: 5px 5px;
        font-size: 14px;
        background-color: #03a9f4;
        color: white;
        border: 1px solid transparent;
        border-radius: 3px;
        cursor: pointer;
    }
`

export const chatRightPanelStyles = css`
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
        overflow: auto;
        margin-top: 5px;
        padding: 0px 6px;
        box-sizing: border-box;
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
`

export const chatGroupStyles = css`
    .top-bar-icon {
        cursor: pointer;
        height: 18px;
        width: 18px;
        transition: .2s all;
    }

    .top-bar-icon:hover {
        color: var(--black)
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
`

export const chatGroupsManagerStyles = css`
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
        flex: 0;
        align-items: center;
    }

    .container-body {
        width: 100%;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        overflow: auto;
        margin-top: 5px;
        padding: 0px 6px;
        box-sizing: border-box;
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

    .message-myBg {
        background-color: var(--chat-bubble-myBg) !important;
        margin-bottom: 15px;
        border-radius: 5px;
        padding: 5px;
    }

    .message-data-name {
        user-select: none;
        color: #03a9f4;
        margin-bottom: 5px;
    }

    .message-user-info {
        display: flex;
        justify-content: space-between;
        width: 100%;
        gap: 10px;
    }

    .hideImg {
        visibility: hidden;
    }

    .checkbox-row {
        position: relative;
        display: flex;
        align-items: center;
        align-content: center;
        font-family: Montserrat, sans-serif;
        font-weight: 600;
        color: var(--black);
        padding-left: 5px;
    }
`

export const chatWelcomePageStyles = css`
    * {
        --mdc-theme-primary: rgb(3, 169, 244);
        --paper-input-container-focus-color: var(--mdc-theme-primary);
        --lumo-primary-text-color: rgb(0, 167, 245);
        --lumo-primary-color-50pct: rgba(0, 167, 245, 0.5);
        --lumo-primary-color-10pct: rgba(0, 167, 245, 0.1);
        --lumo-primary-color: hsl(199, 100%, 48%);
        --lumo-base-color: var(--white);
        --lumo-body-text-color: var(--black);
    }

    @keyframes moveInBottom {
        0% {
            opacity: 0;
            transform: translateY(30px);
        }

        100% {
            opacity: 1;
            transform: translate(0);
        }
    }

    paper-spinner-lite {
        height: 24px;
        width: 24px;
        --paper-spinner-color: var(--mdc-theme-primary);
        --paper-spinner-stroke-width: 2px;
    }

    .welcome-title {
        display: block;
        overflow: hidden;
        font-size: 40px;
        color: var(--black);
        font-weight: 400;
        text-align: center;
        white-space: pre-wrap;
        overflow-wrap: break-word;
        word-break: break-word;
        cursor: inherit;
        margin-top: 2rem;
    }

    .sub-main {
        position: relative;
        text-align: center;
    }

    .center-box {
        position: absolute;
        top: 45%;
        left: 50%;
        transform: translate(-50%, 0%);
        text-align: center;
    }

    .img-icon {
        font-size: 150px;
        color: var(--black);
    }

    .start-chat {
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        border: none;
        border-radius: 20px;
        padding-left: 25px;
        padding-right: 25px;
        color: var(--white);
        background: var(--tradehead);
        width: 50%;
        font-size: 17px;
        cursor: pointer;
        height: 50px;
        margin-top: 1rem;
        text-transform: uppercase;
        text-decoration: none;
        transition: all .2s;
        position: relative;
        animation: moveInBottom .3s ease-out .50s;
        animation-fill-mode: backwards;
    }

    .start-chat:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, .2);
    }

    .start-chat::after {
        content: "";
        display: inline-flex;
        height: 100%;
        width: 100%;
        border-radius: 100px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        transition: all .4s;
    }

    .red {
        --mdc-theme-primary: red;
    }

    h2 {
        margin: 0;
    }

    h2,
    h3,
    h4,
    h5 {
        color: var(--black);
        font-weight: 400;
    }

    [hidden] {
        display: hidden !important;
        visibility: none !important;
    }

    .details {
        display: flex;
        font-size: 18px;
    }

    .title {
        font-weight: 600;
        font-size: 12px;
        line-height: 32px;
        opacity: 0.66;
    }

    .input {
        width: 90%;
        border: none;
        display: inline-block;
        font-size: 16px;
        padding: 10px 20px;
        border-radius: 5px;
        resize: none;
        background: #eee;
    }

    .textarea {
        width: 90%;
        border: none;
        display: inline-block;
        font-size: 16px;
        padding: 10px 20px;
        border-radius: 5px;
        height: 120px;
        resize: none;
        background: #eee;
    }
`

export const chatHeadStyles = css`
    li {
        width: 100%;
        padding: 10px 5px 10px 5px;
        cursor: pointer;
        box-sizing: border-box;
        display: flex;
        align-items: flex-start;
    }

    li:hover {
        background-color: var(--menuhover);
    }

    .active {
        background: var(--menuactive);
        border-left: 4px solid #3498db;
    }

    .img-icon {
        float: left;
        font-size: 40px;
        color: var(--chat-group);
    }

    .about {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin: 0;
    }

    .inner-container {
        display: flex;
        width: calc(100% - 45px);
        flex-direction: column;
        justify-content: center;
    }

    .status {
        color: #92959e;
    }

    .clearfix:after {
        visibility: hidden;
        display: block;
        font-size: 0;
        content: " ";
        clear: both;
        height: 0;
    }

    .name {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }
`

export const chatGroupsModalStyles = css`
    * {
        --mdc-theme-text-primary-on-background: var(--black);
        --mdc-dialog-max-width: 85vw;
        --mdc-dialog-max-height: 95vh;
    }

    .imageContainer {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
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

export const chatTextEditorStyles = css`
    :host {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: auto;
        width: 100%;
        overflow: hidden;
    }

    * {
        --mdc-checkbox-unchecked-color: var(--black);
    }

    .chatbar-container {
        width: 100%;
        display: flex;
        height: auto;
        overflow: hidden;
    }

    .chatbar-caption {
        border-bottom: 2px solid var(--mdc-theme-primary);
    }

    .privateMessageMargin {
        margin-bottom: 12px;
    }

    .emoji-button {
        width: 45px;
        height: 40px;
        padding-top: 4px;
        border: none;
        outline: none;
        background: transparent;
        cursor: pointer;
        max-height: 40px;
        color: var(--black);
        margin-bottom: 5px;
    }

    .message-size-container {
        display: flex;
        justify-content: flex-end;
        width: 100%;
    }

    .message-size {
        font-family: Roboto, sans-serif;
        font-size: 12px;
        color: black;
    }

    .paperclip-icon {
        color: var(--paperclip-icon);
        width: 25px;
    }

    .paperclip-icon:hover {
        cursor: pointer;
    }

    .send-icon {
        width: 30px;
        margin-left: 5px;
        transition: all 0.1s ease-in-out;
        cursor: pointer;
    }

    .send-icon:hover {
        filter: brightness(1.1);
    }

    .file-picker-container {
        position: relative;
        height: 25px;
        width: 25px;
        margin-bottom: 10px;
    }

    .file-picker-input-container {
        position: absolute;
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
        z-index: 10;
        opacity: 0;
        overflow: hidden;
    }

    input[type=file]::-webkit-file-upload-button {
        cursor: pointer;
    }

    .chatbar-container textarea {
        display: none;
    }

    .chatbar-container .chat-editor {
        display: flex;
        max-height: -webkit-fill-available;
        width: 100%;
        border-color: transparent;
        margin: 0;
        padding: 0;
        border: none;
    }

    .checkmark-icon {
        width: 30px;
        color: var(--mdc-theme-primary);
        margin-bottom: 6px;
    }

    .checkmark-icon:hover {
        cursor: pointer;
    }

    .element {
        width: 100%;
        max-height: 100%;
        overflow: auto;
        color: var(--black);
        padding: 0px 10px;
        height: 100%;
        display: flex;
        align-items: safe center;
    }

    .element::-webkit-scrollbar-track {
        background-color: whitesmoke;
        border-radius: 7px;
    }

    .element::-webkit-scrollbar {
        width: 6px;
        border-radius: 7px;
        background-color: whitesmoke;
    }

    .element::-webkit-scrollbar-thumb {
        background-color: rgb(180, 176, 176);
        border-radius: 7px;
        transition: all 0.3s ease-in-out;
    }

    .element::-webkit-scrollbar-thumb:hover {
        background-color: rgb(148, 146, 146);
        cursor: pointer;
    }

    .ProseMirror:focus {
        outline: none;
    }

    .is-active {
        background-color: var(--white)
    }

    .ProseMirror>*+* {
        margin-top: 0.75em;
        outline: none;
    }

    .ProseMirror ul,
    ol {
        padding: 0 1rem;
    }

    .ProseMirror h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        line-height: 1.1;
    }

    .ProseMirror code {
        background-color: rgba(#616161, 0.1);
        color: #616161;
    }

    .ProseMirror pre {
        background: #0D0D0D;
        color: #FFF;
        font-family: 'JetBrainsMono', monospace;
        padding: 0.75rem 1rem;
        border-radius: 0.5rem;
        white-space: pre-wrap;
    }

    .ProseMirror pre code {
        color: inherit;
        padding: 0;
        background: none;
        font-size: 0.8rem;
    }

    .ProseMirror img {
        width: 1.7em;
        height: 1.5em;
        margin: 0px;
    }

    .ProseMirror blockquote {
        padding-left: 1rem;
        border-left: 2px solid rgba(#0D0D0D, 0.1);
    }

    .ProseMirror hr {
        border: none;
        border-top: 2px solid rgba(#0D0D0D, 0.1);
        margin: 2rem 0;
    }

    .chatbar-button-single {
        background: var(--white);
        outline: none;
        border: none;
        color: var(--black);
        padding: 4px;
        border-radius: 5px;
        cursor: pointer;
        margin-right: 2px;
        filter: brightness(100%);
        transition: all 0.2s;
        display: none;
    }

    .removeBg {
        background: none;
    }

    .chatbar-button-single label {
        font-size: 13px;
    }

    .chatbar-button-single:hover {
        filter: brightness(120%);
    }

    .chatbar-buttons {
        margin-bottom: 5px;
        flex-shrink: 0;
    }

    .show-chatbar-buttons {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    :host(:hover) .chatbar-button-single {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .ProseMirror p.is-editor-empty:first-child::before {
        color: #adb5bd;
        content: attr(data-placeholder);
        float: left;
        height: 0;
        pointer-events: none;
    }

    .ProseMirror p {
        font-size: 18px;
        margin-block-start: 0px;
        margin-block-end: 0px;
        overflow-wrap: anywhere;
    }

    .ProseMirror {
        width: 100%;
        box-sizing: border-box;
        word-break: break-word;
    }

    .ProseMirror mark {
        background-color: #ffe066;
        border-radius: 0.25em;
        box-decoration-break: clone;
        padding: 0.125em 0;
    }

    .material-icons {
        font-family: 'Material Icons';
        font-weight: normal;
        font-style: normal;
        font-size: 24px;
        /* Preferred icon size */
        display: inline-block;
        line-height: 1;
        text-transform: none;
        letter-spacing: normal;
        word-wrap: normal;
        white-space: nowrap;
        direction: ltr;
    }

    .material-symbols-outlined {
        font-family: 'Material Icons Outlined';
        font-weight: normal;
        font-style: normal;
        font-size: 18px;
        /* Preferred icon size */
        display: inline-block;
        line-height: 1;
        text-transform: none;
        letter-spacing: normal;
        word-wrap: normal;
        white-space: nowrap;
        direction: ltr;
    }

    .hide-styling {
        display: none;
    }

    mwc-checkbox::shadow .mdc-checkbox::after,
    mwc-checkbox::shadow .mdc-checkbox::before {
        background-color: var(--mdc-theme-primary)
    }

    --mdc-checkbox-unchecked-color
`

export const chatMessageStyles = css`
    .message-data {
        margin-bottom: 15px;
    }

    .message-data-time {
        color: #a8aab1;
        font-size: 13px;
        padding-left: 6px;
    }

    .message {
        color: black;
        padding: 12px 10px;
        line-height: 19px;
        font-size: 16px;
        border-radius: 7px;
        margin-bottom: 20px;
        width: 90%;
        position: relative;
    }

    .message:after {
        bottom: 100%;
        left: 93%;
        border: solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
        border-bottom-color: #ddd;
        border-width: 10px;
        margin-left: -10px;
    }

    .my-message {
        background: #ddd;
        border: 2px #ccc solid;
    }

    .other-message {
        background: #f1f1f1;
        border: 2px solid #dedede;
    }

    .other-message:after {
        border-bottom-color: #f1f1f1;
        left: 7%;
    }

    .align-left {
        text-align: left;
    }

    .align-right {
        text-align: right;
    }

    .float-right {
        float: right;
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

export const chatModalsStyles = css`
    .input {
        width: 90%;
        border: none;
        display: inline-block;
        font-size: 16px;
        padding: 10px 20px;
        border-radius: 5px;
        resize: none;
        background: #eee;
    }

    .textarea {
        width: 90%;
        border: none;
        display: inline-block;
        font-size: 16px;
        padding: 10px 20px;
        border-radius: 5px;
        height: 120px;
        resize: none;
        background: #eee;
    }

    .close-button {
        display: block;
        --mdc-theme-primary: red;
    }
`

export const chatImageStyles = css`
    * {
        --mdc-theme-text-primary-on-background: var(--black);
    }

    img {
        max-width: 45vh;
        max-height: 40vh;
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
        width: 45vh;
        height: 40vh;
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

export const chatSelectStyles = css`
    ul {
        list-style-type: none;
    }

    li {
        padding: 10px 2px 20px 5px;
        cursor: pointer;
        width: 100%;
        display: flex;
        box-sizing: border-box;
    }

    li:hover {
        background-color: var(--menuhover);
    }

    .active {
        background: var(--menuactive);
        border-left: 4px solid #3498db;
    }

    .img-icon {
        font-size: 40px;
        color: var(--chat-group);
    }

    .about {
        margin-top: 8px;
    }

    .about {
        padding-left: 8px;
    }

    .status {
        color: #92959e;
    }

    .name {
        user-select: none;
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

export const chatSideNavHeadsStyles = css`
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

export const imageComponentStyles = css`
    .gif-error-msg {
        margin: 0;
        font-family: Roboto, sans-serif;
        font-size: 17px;
        letter-spacing: 0.3px;
        color: var(--chat-bubble-msg-color);
        font-weight: 300;
        padding: 10px 10px;
    }

    .gif-image {
        border-radius: 15px;
        background-color: transparent;
        cursor: pointer;
        width: 100%;
        height: 150px;
        object-fit: cover;
        border: 1px solid transparent;
        transition: all 0.2s cubic-bezier(0, 0.55, 0.45, 1);
        box-shadow: rgb(50 50 93 / 25%) 0px 6px 12px -2px, rgb(0 0 0 / 30%) 0px 3px 7px -3px;
    }

    .gif-image:hover {
        border: 1px solid var(--mdc-theme-primary);
    }
`

export const qortalInfoViewStyles = css`
    * {
        --mdc-theme-primary: rgb(3, 169, 244);
        --mdc-theme-secondary: var(--mdc-theme-primary);
        --mdc-theme-surface: var(--white);
        --mdc-dialog-content-ink-color: var(--black);
        box-sizing: border-box;
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
        font-size: 14px;
        line-height: 16px;
    }

    ul {
        list-style: none;
        display: flex;
    }

    ul li {
        margin: 15px auto;
        font-size: 15px;
        font-weight: 600;
        color: #03a9f4;
    }

    .btn-info {
        color: #03a9f4;
        --mdc-icon-size: 16px;
        padding-top: 3px;
    }

    .data-info {
        margin-top: 10px;
        margin-right: 25px;
    }

    .data-items {
        font-weight: 600;
        color: var(--black);
        display: block;
        text-align: center;
    }

    .title {
        font-weight: 600;
        font-size: 12px;
        line-height: 32px;
        opacity: 0.66;
    }

    #transactionList {
        color: var(--black);
        padding: 15px;
    }

    .color-in {
        color: #02977e;
        background-color: rgba(0, 201, 167, 0.2);
        font-weight: 700;
        font-size: 0.60938rem;
        border-radius: 0.25rem !important;
        padding: 0.2rem 0.5rem;
        margin-left: 4px;
    }

    .color-out {
        color: #b47d00;
        background-color: rgba(219, 154, 4, 0.2);
        font-weight: 700;
        font-size: 0.60938rem;
        border-radius: 0.25rem !important;
        padding: 0.2rem 0.5rem;
        margin-left: 4px;
    }

    .card-body {
        background-color: var(--white);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        min-height: 100vh;
        margin: 0;
    }

    .card-container {
        background-color: var(--white);
        border-radius: 5px;
        color: var(--black);
        padding-top: 30px;
        position: relative;
        width: 350px;
        max-width: 100%;
        text-align: center;
    }

    .card-container-button {
        background-color: var(--white);
        border-radius: 5px;
        color: var(--black);
        padding-top: 30px;
        position: relative;
        width: 500px;
        max-width: 100%;
        text-align: center;
    }

    .card-explorer-container {
        background-color: var(--white);
        border-radius: 5px;
        color: var(--black);
        padding-top: 10px;
        position: relative;
        width: 900px;
        max-width: 100%;
        text-align: center;
    }

    .card-container .level {
        color: #ffffff;
        background-color: #03a9f4;
        border-radius: 3px;
        font-size: 14px;
        font-weight: bold;
        padding: 3px 7px;
        position: absolute;
        top: 30px;
        left: 30px;
    }

    .card-container .founder {
        color: #ffffff;
        background-color: #03a9f4;
        border-radius: 3px;
        font-size: 14px;
        font-weight: bold;
        padding: 3px 7px;
        position: absolute;
        top: 30px;
        right: 30px;
    }

    .card-container .round {
        width: 96px;
        height: 96px;
        border: 1px solid #03a9f4;
        border-radius: 50%;
        padding: 2px;
    }

    .card-container .badge {
        width: 200px;
        height: 135px;
        border: 1px solid transparent;
        border-radius: 10%;
        padding: 2px;
    }

    .userdata {
        background-color: #1F1A36;
        text-align: left;
        padding: 15px;
        margin-top: 30px;
    }

    .userdata ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }

    .userdata ul li {
        border: 1px solid #2D2747;
        border-radius: 2px;
        display: inline-block;
        font-size: 12px;
        margin: 0 7px 7px 0;
        padding: 7px;
    }

    .decline {
        --mdc-theme-primary: #F44336;
    }

    .buttons {
        text-align: right;
    }

    .loadingContainer {
        height: 100%;
        width: 100%;
    }

    .loading,
    .loading:after {
        border-radius: 50%;
        width: 5em;
        height: 5em;
    }

    .loading {
        margin: 10px auto;
        border-width: .6em;
        border-style: solid;
        border-color: rgba(3, 169, 244, 0.2) rgba(3, 169, 244, 0.2) rgba(3, 169, 244, 0.2) rgb(3, 169, 244);
        font-size: 10px;
        position: relative;
        text-indent: -9999em;
        transform: translateZ(0px);
        animation: 1.1s linear 0s infinite normal none running loadingAnimation;
    }

    .explorer-trades {
        text-align: center;
    }

    .box {
        margin: 0;
        padding: 0;
        display: flex;
        flex-flow: column;
        height: 100%;
    }

    .box-info {
        margin: 0;
        padding: 0;
        display: flex;
        flex-flow: column;
        height: 250px;
    }

    header {
        display: flex;
        flex: 0 1 auto;
        align-items: center;
        justify-content: center;
        padding: 0px 10px;
        font-size: 16px;
        color: var(--white);
        background-color: var(--tradehead);
        border-left: 1px solid var(--tradeborder);
        border-top: 1px solid var(--tradeborder);
        border-right: 1px solid var(--tradeborder);
        min-height: 40px;
    }

    .border-wrapper {
        border: 1px var(--tradeborder) solid;
        overflow: hidden;
    }

    #first-explorer-section {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-auto-rows: max(250px);
        column-gap: 0.5em;
        row-gap: 0.4em;
        justify-items: stretch;
        align-items: stretch;
        margin-bottom: 10px;
    }

    #second-explorer-section {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-auto-rows: max(250px);
        column-gap: 0.5em;
        row-gap: 0.4em;
        justify-items: stretch;
        align-items: stretch;
        margin-bottom: 10px;
    }

    #third-explorer-section {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-auto-rows: max(250px);
        column-gap: 0.5em;
        row-gap: 0.4em;
        justify-items: stretch;
        align-items: stretch;
        margin-bottom: 10px;
    }

    #first-explorer-section>div {}

    #second-explorer-section>div {}

    #third-explorer-section>div {}

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

    .full-info {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: #1da1f2;
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

    .round-fullinfo {
        position: relative;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        right: 25px;
        top: -1px;
    }
`

export const qortalQrcodeGeneratorStyles = css`
    :host {
        display: block;
    }
`

export const tradeInfoViewStyles = css`
    * {
        --mdc-theme-primary: rgb(3, 169, 244);
        --mdc-theme-secondary: var(--mdc-theme-primary);
        --mdc-theme-surface: var(--white);
        box-sizing: border-box;
    }

    p {
        margin: 0;
        padding: 0;
        color: var(--black);
    }

    .get-user-info {
        margin: 0;
        padding: 0;
        color: var(--black);
    }

    .get-user-info:hover {
        cursor: pointer;
        color: #03a9f4;
    }

    .pds {
        background: var(--white);
        border: 1px solid var(--black);
        border-radius: 5px;
    }

    .card {
        position: relative;
        display: flex;
        flex-direction: column;
        min-width: 0;
        height: calc(100% - 1rem);
        word-wrap: break-word;
        background-color: var(--white);
        background-clip: border-box;
        margin-bottom: 1rem;
    }

    .card-header {
        padding: 0.5rem 1rem;
        margin-bottom: 0;
        background-color: rgba(0, 0, 0, 0.03);
        border-bottom: 2px solid rgba(0, 0, 0, 0.125);
    }

    .card-header {
        background: none;
        border-width: 0;
        padding: 10px;
        padding-bottom: 0rem;
    }

    .card-title {
        font-size: 1.2rem;
        color: var(--black);
        margin-bottom: 0.5rem;
    }

    .card-body {
        flex: 1 1 auto;
        padding: 1rem 1rem;
    }

    .card-body {
        padding: 20px;
    }

    .d-sm-flex {
        display: flex !important;
    }

    .align-items-center {
        align-items: center !important;
    }

    .justify-content-between {
        justify-content: space-between !important;
    }

    .d-flex {
        display: flex !important;
    }

    .mb-3 {
        margin-bottom: 1rem !important;
    }

    .cwh-64 {
        width: 64px !important;
        height: 64px !important;
    }

    .cwh-80 {
        width: 80px !important;
        height: 80px !important;
    }

    .rounded {
        border-radius: 25% !important;
    }

    .ms-3 {
        margin-left: 1rem !important;
    }

    .cfs-12 {
        font-size: 12px !important;
    }

    .cfs-14 {
        font-size: 14px !important;
    }

    .cfs-16 {
        font-size: 16px !important;
    }

    .cfs-18 {
        font-size: 18px !important;
    }

    .me-sm-3 {
        margin-right: 1rem !important;
    }

    .ms-sm-0 {
        margin-left: 0 !important;
    }

    .text-sm-end {
        text-align: right !important;
    }

    .order-0 {
        order: 0 !important;
    }

    .order-1 {
        order: 1 !important;
    }

    .order-sm-0 {
        order: 0 !important;
    }

    .order-sm-1 {
        order: 1 !important;
    }

    .red {
        color: #F44336;
    }

    .green {
        color: #198754;
    }

    .buttons {
        display: inline;
        float: right;
        margin-bottom: 5px;
        margin-right: 5px;
    }

    .loadingContainer {
        height: 100%;
        width: 100%;
    }

    .loading,
    .loading:after {
        border-radius: 50%;
        width: 5em;
        height: 5em;
    }

    .loading {
        margin: 10px auto;
        border-width: .6em;
        border-style: solid;
        border-color: rgba(3, 169, 244, 0.2) rgba(3, 169, 244, 0.2) rgba(3, 169, 244, 0.2) rgb(3, 169, 244);
        font-size: 10px;
        position: relative;
        text-indent: -9999em;
        transform: translateZ(0px);
        animation: 1.1s linear 0s infinite normal none running loadingAnimation;
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

    table {
        caption-side: bottom;
        border-collapse: collapse;
    }

    caption {
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
        color: #6c757d;
        text-align: left;
    }

    th {
        text-align: inherit;
        text-align: -webkit-match-parent;
    }

    thead,
    tbody,
    tfoot,
    tr,
    td,
    th {
        border-color: inherit;
        border-style: solid;
        border-width: 0;
    }

    .table {
        --bs-table-bg: transparent;
        --bs-table-striped-color: #212529;
        --bs-table-striped-bg: rgba(255, 255, 255, 0.2);
        --bs-table-active-color: #212529;
        --bs-table-active-bg: rgba(0, 0, 0, 0.1);
        --bs-table-hover-color: #212529;
        --bs-table-hover-bg: rgba(0, 0, 0, 0.075);
        width: 100%;
        margin-bottom: 1rem;
        color: var(--black);
        vertical-align: top;
        border-color: #edeff4;
    }

    .table> :not(caption)>*>* {
        padding: 0.75rem 0.75rem;
        background-color: var(--bs-table-bg);
        background-image: linear-gradient(var(--bs-table-accent-bg), var(--bs-table-accent-bg));
        border-bottom-width: 2px;
    }

    .table>tbody {
        vertical-align: inherit;
    }

    .table>thead {
        vertical-align: bottom;
    }

    .table> :not(:last-child)> :last-child>* {
        border-bottom-color: currentColor;
    }

    .caption-top {
        caption-side: top;
    }

    .table-sm> :not(caption)>*>* {
        padding: 0.5rem 0.5rem;
    }

    .table-bordered> :not(caption)>* {
        border-width: 2px 0;
    }

    .table-bordered> :not(caption)>*>* {
        border-width: 0 2px;
    }

    .table-borderless> :not(caption)>*>* {
        border-bottom-width: 0;
    }

    .table-striped>tbody>tr:nth-of-type(odd) {
        --bs-table-accent-bg: var(--bs-table-striped-bg);
        color: var(--black);
    }

    .table-active {
        --bs-table-accent-bg: var(--bs-table-active-bg);
        color: var(--bs-table-active-color);
    }

    .table-hover>tbody>tr:hover {
        --bs-table-accent-bg: var(--bs-table-hover-bg);
        color: var(--bs-table-hover-color);
    }

    .table-primary {
        --bs-table-bg: #cfe2ff;
        --bs-table-striped-bg: #c5d7f2;
        --bs-table-striped-color: #000;
        --bs-table-active-bg: #bacbe6;
        --bs-table-active-color: #000;
        --bs-table-hover-bg: #bfd1ec;
        --bs-table-hover-color: #000;
        color: #000;
        border-color: #bacbe6;
    }

    .table-secondary {
        --bs-table-bg: #e2e3e5;
        --bs-table-striped-bg: #d7d8da;
        --bs-table-striped-color: #000;
        --bs-table-active-bg: #cbccce;
        --bs-table-active-color: #000;
        --bs-table-hover-bg: #d1d2d4;
        --bs-table-hover-color: #000;
        color: #000;
        border-color: #cbccce;
    }

    .table-success {
        --bs-table-bg: #e1f5d4;
        --bs-table-striped-bg: #d6e9c9;
        --bs-table-striped-color: #000;
        --bs-table-active-bg: #cbddbf;
        --bs-table-active-color: #000;
        --bs-table-hover-bg: #d0e3c4;
        --bs-table-hover-color: #000;
        color: #000;
        border-color: #cbddbf;
    }

    .table-info {
        --bs-table-bg: #cff4fc;
        --bs-table-striped-bg: #c5e8ef;
        --bs-table-striped-color: #000;
        --bs-table-active-bg: #badce3;
        --bs-table-active-color: #000;
        --bs-table-hover-bg: #bfe2e9;
        --bs-table-hover-color: #000;
        color: #000;
        border-color: #badce3;
    }

    .table-warning {
        --bs-table-bg: #fff3cd;
        --bs-table-striped-bg: #f2e7c3;
        --bs-table-striped-color: #000;
        --bs-table-active-bg: #e6dbb9;
        --bs-table-active-color: #000;
        --bs-table-hover-bg: #ece1be;
        --bs-table-hover-color: #000;
        color: #000;
        border-color: #e6dbb9;
    }

    .table-danger {
        --bs-table-bg: #f8d7da;
        --bs-table-striped-bg: #eccccf;
        --bs-table-striped-color: #000;
        --bs-table-active-bg: #dfc2c4;
        --bs-table-active-color: #000;
        --bs-table-hover-bg: #e5c7ca;
        --bs-table-hover-color: #000;
        color: #000;
        border-color: #dfc2c4;
    }

    .table-light {
        --bs-table-bg: #f8f9fa;
        --bs-table-striped-bg: #ecedee;
        --bs-table-striped-color: #000;
        --bs-table-active-bg: #dfe0e1;
        --bs-table-active-color: #000;
        --bs-table-hover-bg: #e5e6e7;
        --bs-table-hover-color: #000;
        color: #000;
        border-color: #dfe0e1;
    }

    .table-dark {
        --bs-table-bg: #212529;
        --bs-table-striped-bg: #2c3034;
        --bs-table-striped-color: #fff;
        --bs-table-active-bg: #373b3e;
        --bs-table-active-color: #fff;
        --bs-table-hover-bg: #323539;
        --bs-table-hover-color: #fff;
        color: #fff;
        border-color: #373b3e;
    }

    .table-responsive {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
    }

    @media (max-width: 359.98px) {
        .table-responsive-xxs {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
        }
    }

    @media (max-width: 499.98px) {
        .table-responsive-xsm {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
        }
    }

    @media (max-width: 575.98px) {
        .table-responsive-sm {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
        }
    }

    @media (max-width: 767.98px) {
        .table-responsive-md {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
        }
    }

    @media (max-width: 991.98px) {
        .table-responsive-lg {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
        }
    }

    @media (max-width: 1199.98px) {
        .table-responsive-xl {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
        }
    }

    @media (max-width: 1399.98px) {
        .table-responsive-xxl {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
        }
    }

    th {
        font-weight: 500;
    }

    tbody::-webkit-scrollbar,
    tbody::-webkit-scrollbar-thumb,
    tbody::-webkit-scrollbar-track {
        opacity: 0;
        width: 5px;
        border-radius: 6px;
        position: absolute;
        right: 0;
        top: 0;
    }

    tbody:hover::-webkit-scrollbar,
    tbody:hover::-webkit-scrollbar-thumb,
    tbody:hover::-webkit-scrollbar-track {
        opacity: 0.9;
        width: 5px;
        border-radius: 6px;
        right: 2px;
        position: absolute;
        transition: background-color 0.2s linear, width 0.2s ease-in-out;
    }

    tbody:hover::-webkit-scrollbar-thumb {
        background-color: #eee;
    }

    .mt-0 {
        margin-top: 0 !important;
    }

    .mt-1 {
        margin-top: 0.25rem !important;
    }

    .mt-2 {
        margin-top: 0.5rem !important;
    }

    .mt-3 {
        margin-top: 1rem !important;
    }

    .mt-4 {
        margin-top: 1.5rem !important;
    }

    .mt-5 {
        margin-top: 3rem !important;
    }

    .mt-auto {
        margin-top: auto !important;
    }

    .w-25 {
        width: 25% !important;
    }

    .w-50 {
        width: 50% !important;
    }

    .w-75 {
        width: 75% !important;
    }

    .w-100 {
        width: 100% !important;
    }

    .w-auto {
        width: auto !important;
    }

    .cmw-30 {
        min-width: 30rem;
    }

    .fst-normal {
        font-style: normal !important;
    }

    .fw-light {
        font-weight: 300 !important;
    }

    .fw-lighter {
        font-weight: lighter !important;
    }

    .fw-normal {
        font-weight: 400 !important;
    }

    .fw-bold {
        font-weight: 500 !important;
    }

    .fw-bolder {
        font-weight: bolder !important;
    }

    .text-lowercase {
        text-transform: lowercase !important;
    }

    .text-uppercase {
        text-transform: uppercase !important;
    }

    .text-capitalize {
        text-transform: capitalize !important;
    }

    .text-start {
        text-align: left !important;
    }

    .text-end {
        text-align: right !important;
    }

    .text-center {
        text-align: center !important;
    }

    .text-primary {
        color: #0e6eff !important;
    }

    .text-secondary {
        color: #6c757d !important;
    }

    .text-success {
        color: #68cf29 !important;
    }

    .text-info {
        color: #03a9f4 !important;
    }

    .text-warning {
        color: #ffc107 !important;
    }

    .text-danger {
        color: #dc3545 !important;
    }

    .text-light {
        color: #f8f9fa !important;
    }

    .text-dark {
        color: #212529 !important;
    }

    .text-white {
        color: #fff !important;
    }

    .btn {
        display: inline-block;
        font-weight: 400;
        line-height: 1.5;
        color: #212529;
        text-align: center;
        text-decoration: none;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        background-color: transparent;
        border: 2px solid transparent;
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        border-radius: 5px;
        transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }

    @media (prefers-reduced-motion: reduce) {
        .btn {
            transition: none;
        }
    }

    .btn:hover {
        color: #212529;
    }

    .btn-check:focus+.btn,
    .btn:focus {
        outline: 0;
        box-shadow: 0 0 0 0.25rem rgba(14, 110, 255, 0.25);
    }

    .btn:disabled,
    .btn.disabled,
    fieldset:disabled .btn {
        pointer-events: none;
        opacity: 0.65;
    }

    .btn-primary {
        color: #fff;
        background-color: #0e6eff;
        border-color: #edeff4;
    }

    .btn-primary:hover {
        color: #ddd;
        background-color: #3284ff;
        border-color: #267dff;
    }

    .btn-check:focus+.btn-primary,
    .btn-primary:focus {
        color: #ddd;
        background-color: #3284ff;
        border-color: #267dff;
        box-shadow: 0 0 0 0.25rem rgba(12, 94, 217, 0.5);
    }

    .btn-check:checked+.btn-primary,
    .btn-check:active+.btn-primary,
    .btn-primary:active,
    .btn-primary.active,
    .show>.btn-primary.dropdown-toggle {
        color: #ddd;
        background-color: #3e8bff;
        border-color: #267dff;
    }

    .btn-check:checked+.btn-primary:focus,
    .btn-check:active+.btn-primary:focus,
    .btn-primary:active:focus,
    .btn-primary.active:focus,
    .show>.btn-primary.dropdown-toggle:focus {
        box-shadow: 0 0 0 0.25rem rgba(12, 94, 217, 0.5);
    }

    .btn-primary:disabled,
    .btn-primary.disabled {
        color: #ddd;
        background-color: #0e6eff;
        border-color: #0e6eff;
    }

    .btn-secondary {
        color: #fff;
        background-color: #6c757d;
        border-color: #edeff4;
    }

    .btn-secondary:hover {
        color: #ddd;
        background-color: #5c636a;
        border-color: #565e64;
    }

    .btn-check:focus+.btn-secondary,
    .btn-secondary:focus {
        color: #ddd;
        background-color: #5c636a;
        border-color: #565e64;
        box-shadow: 0 0 0 0.25rem rgba(130, 138, 145, 0.5);
    }

    .btn-check:checked+.btn-secondary,
    .btn-check:active+.btn-secondary,
    .btn-secondary:active,
    .btn-secondary.active,
    .show>.btn-secondary.dropdown-toggle {
        color: #ddd;
        background-color: #565e64;
        border-color: #51585e;
    }

    .btn-check:checked+.btn-secondary:focus,
    .btn-check:active+.btn-secondary:focus,
    .btn-secondary:active:focus,
    .btn-secondary.active:focus,
    .show>.btn-secondary.dropdown-toggle:focus {
        box-shadow: 0 0 0 0.25rem rgba(130, 138, 145, 0.5);
    }

    .btn-secondary:disabled,
    .btn-secondary.disabled {
        color: #ddd;
        background-color: #6c757d;
        border-color: #6c757d;
    }

    .btn-success {
        color: #fff;
        background-color: #68cf29;
        border-color: #edeff4;
    }

    .btn-success:hover {
        color: #ddd;
        background-color: #7fd649;
        border-color: #77d43e;
    }

    .btn-check:focus+.btn-success,
    .btn-success:focus {
        color: #ddd;
        background-color: #7fd649;
        border-color: #77d43e;
        box-shadow: 0 0 0 0.25rem rgba(88, 176, 35, 0.5);
    }

    .btn-check:checked+.btn-success,
    .btn-check:active+.btn-success,
    .btn-success:active,
    .btn-success.active,
    .show>.btn-success.dropdown-toggle {
        color: #ddd;
        background-color: #86d954;
        border-color: #77d43e;
    }

    .btn-check:checked+.btn-success:focus,
    .btn-check:active+.btn-success:focus,
    .btn-success:active:focus,
    .btn-success.active:focus,
    .show>.btn-success.dropdown-toggle:focus {
        box-shadow: 0 0 0 0.25rem rgba(88, 176, 35, 0.5);
    }

    .btn-success:disabled,
    .btn-success.disabled {
        color: #ddd;
        background-color: #68cf29;
        border-color: #68cf29;
    }

    .btn-info {
        color: #fff;
        background-color: #0dcaf0;
        border-color: #edeff4;
    }

    .btn-info:hover {
        color: #ddd;
        background-color: #31d2f2;
        border-color: #25cff2;
    }

    .btn-check:focus+.btn-info,
    .btn-info:focus {
        color: #ddd;
        background-color: #31d2f2;
        border-color: #25cff2;
        box-shadow: 0 0 0 0.25rem rgba(11, 172, 204, 0.5);
    }

    .btn-check:checked+.btn-info,
    .btn-check:active+.btn-info,
    .btn-info:active,
    .btn-info.active,
    .show>.btn-info.dropdown-toggle {
        color: #ddd;
        background-color: #3dd5f3;
        border-color: #25cff2;
    }

    .btn-check:checked+.btn-info:focus,
    .btn-check:active+.btn-info:focus,
    .btn-info:active:focus,
    .btn-info.active:focus,
    .show>.btn-info.dropdown-toggle:focus {
        box-shadow: 0 0 0 0.25rem rgba(11, 172, 204, 0.5);
    }

    .btn-info:disabled,
    .btn-info.disabled {
        color: #000;
        background-color: #0dcaf0;
        border-color: #0dcaf0;
    }

    .btn-warning {
        color: #fff;
        background-color: #ffc107;
        border-color: #edeff4;
    }

    .btn-warning:hover {
        color: #ddd;
        background-color: #ffca2c;
        border-color: #ffc720;
    }

    .btn-check:focus+.btn-warning,
    .btn-warning:focus {
        color: #ddd;
        background-color: #ffca2c;
        border-color: #ffc720;
        box-shadow: 0 0 0 0.25rem rgba(217, 164, 6, 0.5);
    }

    .btn-check:checked+.btn-warning,
    .btn-check:active+.btn-warning,
    .btn-warning:active,
    .btn-warning.active,
    .show>.btn-warning.dropdown-toggle {
        color: #ddd;
        background-color: #ffcd39;
        border-color: #ffc720;
    }

    .btn-check:checked+.btn-warning:focus,
    .btn-check:active+.btn-warning:focus,
    .btn-warning:active:focus,
    .btn-warning.active:focus,
    .show>.btn-warning.dropdown-toggle:focus {
        box-shadow: 0 0 0 0.25rem rgba(217, 164, 6, 0.5);
    }

    .btn-warning:disabled,
    .btn-warning.disabled {
        color: #ddd;
        background-color: #ffc107;
        border-color: #ffc107;
    }

    .btn-danger {
        color: #fff;
        background-color: #dc3545;
        border-color: #edeff4;
    }

    .btn-danger:hover {
        color: #ddd;
        background-color: #bb2d3b;
        border-color: #b02a37;
    }

    .btn-check:focus+.btn-danger,
    .btn-danger:focus {
        color: #ddd;
        background-color: #bb2d3b;
        border-color: #b02a37;
        box-shadow: 0 0 0 0.25rem rgba(225, 83, 97, 0.5);
    }

    .btn-check:checked+.btn-danger,
    .btn-check:active+.btn-danger,
    .btn-danger:active,
    .btn-danger.active,
    .show>.btn-danger.dropdown-toggle {
        color: #ddd;
        background-color: #b02a37;
        border-color: #a52834;
    }

    .btn-check:checked+.btn-danger:focus,
    .btn-check:active+.btn-danger:focus,
    .btn-danger:active:focus,
    .btn-danger.active:focus,
    .show>.btn-danger.dropdown-toggle:focus {
        box-shadow: 0 0 0 0.25rem rgba(225, 83, 97, 0.5);
    }

    .btn-danger:disabled,
    .btn-danger.disabled {
        color: #ddd;
        background-color: #dc3545;
        border-color: #dc3545;
    }

    .btn-light {
        color: #000;
        background-color: #f8f9fa;
        border-color: #edeff4;
    }

    .btn-light:hover {
        color: #000;
        background-color: #f9fafb;
        border-color: #f9fafb;
    }

    .btn-check:focus+.btn-light,
    .btn-light:focus {
        color: #000;
        background-color: #f9fafb;
        border-color: #f9fafb;
        box-shadow: 0 0 0 0.25rem rgba(211, 212, 213, 0.5);
    }

    .btn-check:checked+.btn-light,
    .btn-check:active+.btn-light,
    .btn-light:active,
    .btn-light.active,
    .show>.btn-light.dropdown-toggle {
        color: #000;
        background-color: #f9fafb;
        border-color: #f9fafb;
    }

    .btn-check:checked+.btn-light:focus,
    .btn-check:active+.btn-light:focus,
    .btn-light:active:focus,
    .btn-light.active:focus,
    .show>.btn-light.dropdown-toggle:focus {
        box-shadow: 0 0 0 0.25rem rgba(211, 212, 213, 0.5);
    }

    .btn-light:disabled,
    .btn-light.disabled {
        color: #000;
        background-color: #f8f9fa;
        border-color: #f8f9fa;
    }

    .btn-dark {
        color: #fff;
        background-color: #212529;
        border-color: #edeff4;
    }

    .btn-dark:hover {
        color: #ddd;
        background-color: #1c1f23;
        border-color: #1a1e21;
    }

    .btn-check:focus+.btn-dark,
    .btn-dark:focus {
        color: #ddd;
        background-color: #1c1f23;
        border-color: #1a1e21;
        box-shadow: 0 0 0 0.25rem rgba(66, 70, 73, 0.5);
    }

    .btn-check:checked+.btn-dark,
    .btn-check:active+.btn-dark,
    .btn-dark:active,
    .btn-dark.active,
    .show>.btn-dark.dropdown-toggle {
        color: #ddd;
        background-color: #1a1e21;
        border-color: #191c1f;
    }

    .btn-check:checked+.btn-dark:focus,
    .btn-check:active+.btn-dark:focus,
    .btn-dark:active:focus,
    .btn-dark.active:focus,
    .show>.btn-dark.dropdown-toggle:focus {
        box-shadow: 0 0 0 0.25rem rgba(66, 70, 73, 0.5);
    }

    .btn-dark:disabled,
    .btn-dark.disabled {
        color: #ddd;
        background-color: #212529;
        border-color: #212529;
    }

    .btn-white {
        color: #000;
        background-color: #fff;
        border-color: #edeff4;
    }

    .btn-white:hover {
        color: #000;
        background-color: white;
        border-color: white;
    }

    .btn-check:focus+.btn-white,
    .btn-white:focus {
        color: #000;
        background-color: white;
        border-color: white;
        box-shadow: 0 0 0 0.25rem rgba(217, 217, 217, 0.5);
    }

    .btn-check:checked+.btn-white,
    .btn-check:active+.btn-white,
    .btn-white:active,
    .btn-white.active,
    .show>.btn-white.dropdown-toggle {
        color: #000;
        background-color: white;
        border-color: white;
    }

    .btn-check:checked+.btn-white:focus,
    .btn-check:active+.btn-white:focus,
    .btn-white:active:focus,
    .btn-white.active:focus,
    .show>.btn-white.dropdown-toggle:focus {
        box-shadow: 0 0 0 0.25rem rgba(217, 217, 217, 0.5);
    }

    .btn-white:disabled,
    .btn-white.disabled {
        color: #000;
        background-color: #fff;
        border-color: #fff;
    }

    .btn-lg>.btn {
        padding: 0.5rem 1rem;
        font-size: 1.25rem;
        border-radius: 0.3rem;
    }

    .btn-sm>.btn {
        padding: 0.25rem 0.5rem;
        font-size: 0.875rem;
        border-radius: 0.2rem;
    }

    .border-0 {
        border: 0 !important;
    }

    .px-0 {
        padding-right: 0 !important;
        padding-left: 0 !important;
    }

    .px-1 {
        padding-right: 0.25rem !important;
        padding-left: 0.25rem !important;
    }

    .px-2 {
        padding-right: 0.5rem !important;
        padding-left: 0.5rem !important;
    }

    .px-3 {
        padding-right: 1rem !important;
        padding-left: 1rem !important;
    }

    .px-4 {
        padding-right: 1.5rem !important;
        padding-left: 1.5rem !important;
    }

    .px-5 {
        padding-right: 3rem !important;
        padding-left: 3rem !important;
    }
`

export const traderInfoViewStyles = css`
    * {
        --mdc-theme-primary: rgb(3, 169, 244);
        --mdc-theme-secondary: var(--mdc-theme-primary);
        --mdc-theme-surface: var(--white);
        --mdc-dialog-content-ink-color: var(--black);
        box-sizing: border-box;
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
        font-size: 14px;
        line-height: 16px;
    }

    ul {
        list-style: none;
        display: flex;
    }

    ul li {
        margin: 15px auto;
        font-size: 15px;
        font-weight: 600;
        color: #03a9f4;
    }

    .btn-info {
        color: #03a9f4;
        --mdc-icon-size: 16px;
        padding-top: 3px;
    }

    .data-info {
        margin-top: 10px;
        margin-right: 25px;
    }

    .data-items {
        font-weight: 600;
        color: var(--black);
        display: block;
        text-align: center;
    }

    .title {
        font-weight: 600;
        font-size: 12px;
        line-height: 32px;
        opacity: 0.66;
    }

    #transactionList {
        color: var(--black);
        padding: 15px;
    }

    .color-in {
        color: #02977e;
        background-color: rgba(0, 201, 167, 0.2);
        font-weight: 700;
        font-size: 0.60938rem;
        border-radius: 0.25rem !important;
        padding: 0.2rem 0.5rem;
        margin-left: 4px;
    }

    .color-out {
        color: #b47d00;
        background-color: rgba(219, 154, 4, 0.2);
        font-weight: 700;
        font-size: 0.60938rem;
        border-radius: 0.25rem !important;
        padding: 0.2rem 0.5rem;
        margin-left: 4px;
    }

    .card-body {
        background-color: var(--white);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        min-height: 100vh;
        margin: 0;
    }

    .card-container {
        background-color: var(--white);
        border-radius: 5px;
        color: var(--black);
        padding-top: 30px;
        position: relative;
        width: 350px;
        max-width: 100%;
        text-align: center;
    }

    .card-container-button {
        background-color: var(--white);
        border-radius: 5px;
        color: var(--black);
        padding-top: 30px;
        position: relative;
        width: 500px;
        max-width: 100%;
        text-align: center;
    }

    .card-explorer-container {
        background-color: var(--white);
        border-radius: 5px;
        color: var(--black);
        padding-top: 10px;
        position: relative;
        width: 900px;
        max-width: 100%;
        text-align: center;
    }

    .card-container .level {
        color: #ffffff;
        background-color: #03a9f4;
        border-radius: 3px;
        font-size: 14px;
        font-weight: bold;
        padding: 3px 7px;
        position: absolute;
        top: 30px;
        left: 30px;
    }

    .card-container .founder {
        color: #ffffff;
        background-color: #03a9f4;
        border-radius: 3px;
        font-size: 14px;
        font-weight: bold;
        padding: 3px 7px;
        position: absolute;
        top: 30px;
        right: 30px;
    }

    .card-container .round {
        width: 96px;
        height: 96px;
        border: 1px solid #03a9f4;
        border-radius: 50%;
        padding: 2px;
    }

    .card-container .badge {
        width: 200px;
        height: 135px;
        border: 1px solid transparent;
        border-radius: 10%;
        padding: 2px;
    }

    .userdata {
        background-color: #1F1A36;
        text-align: left;
        padding: 15px;
        margin-top: 30px;
    }

    .userdata ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }

    .userdata ul li {
        border: 1px solid #2D2747;
        border-radius: 2px;
        display: inline-block;
        font-size: 12px;
        margin: 0 7px 7px 0;
        padding: 7px;
    }

    .decline {
        --mdc-theme-primary: var(--mdc-theme-error)
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

    .loadingContainer {
        height: 100%;
        width: 100%;
    }

    .loading,
    .loading:after {
        border-radius: 50%;
        width: 5em;
        height: 5em;
    }

    .loading {
        margin: 10px auto;
        border-width: .6em;
        border-style: solid;
        border-color: rgba(3, 169, 244, 0.2) rgba(3, 169, 244, 0.2) rgba(3, 169, 244, 0.2) rgb(3, 169, 244);
        font-size: 10px;
        position: relative;
        text-indent: -9999em;
        transform: translateZ(0px);
        animation: 1.1s linear 0s infinite normal none running loadingAnimation;
    }

    .explorer-trades {
        text-align: center;
    }

    .box {
        margin: 0;
        padding: 0;
        display: flex;
        flex-flow: column;
        height: 100%;
    }

    .box-info {
        margin: 0;
        padding: 0;
        display: flex;
        flex-flow: column;
        height: 250px;
    }

    .box-info-full {
        margin: 0;
        padding: 0;
        display: flex;
        flex-flow: column;
        height: 450px;
        width: 450px;
    }

    header {
        display: flex;
        flex: 0 1 auto;
        align-items: center;
        justify-content: center;
        padding: 0px 10px;
        font-size: 16px;
        color: var(--black);
        background-color: var(--tradehead);
        border-left: 1px solid var(--tradeborder);
        border-top: 1px solid var(--tradeborder);
        border-right: 1px solid var(--tradeborder);
        min-height: 40px;
    }

    .border-wrapper {
        border: 1px var(--tradeborder) solid;
        overflow: hidden;
    }


    #first-explorer-section {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-auto-rows: max(250px);
        column-gap: 0.5em;
        row-gap: 0.4em;
        justify-items: stretch;
        align-items: stretch;
        margin-bottom: 10px;
    }

    #second-explorer-section {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-auto-rows: max(250px);
        column-gap: 0.5em;
        row-gap: 0.4em;
        justify-items: stretch;
        align-items: stretch;
        margin-bottom: 10px;
    }

    #third-explorer-section {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-auto-rows: max(250px);
        column-gap: 0.5em;
        row-gap: 0.4em;
        justify-items: stretch;
        align-items: stretch;
        margin-bottom: 10px;
    }

    #first-explorer-section>div {}

    #second-explorer-section>div {}

    #third-explorer-section>div {}

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

    .full-info {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: #1da1f2;
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

    .round-fullinfo {
        position: relative;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        right: 25px;
        top: -1px;
    }
`

export const userInfoStyles = css`
    .user-info-header {
        font-family: Montserrat, sans-serif;
        text-align: center;
        font-size: 28px;
        color: var(--chat-bubble-msg-color);
        margin-bottom: 10px;
        padding: 10px 0;
    }

    .avatar-container {
        display: flex;
        justify-content: center;
    }

    .user-info-avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin: 10px 0;
    }

    .user-info-no-avatar {
        display: flex;
        justify-content: center;
        align-items: center;
        text-transform: capitalize;
        font-size: 50px;
        font-family: Roboto, sans-serif;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: var(--chatHeadBg);
        color: var(--chatHeadText);
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
    }

    .send-message-button:hover {
        cursor: pointer;
        background-color: #03a8f485;
    }

    .close-icon {
        position: absolute;
        top: 3px;
        right: 5px;
        color: #676b71;
        width: 14px;
        transition: all 0.1s ease-in-out;
    }

    .close-icon:hover {
        cursor: pointer;
        color: #494c50;
    }
`

export const gifExplorerStyles = css`
    .gifs-container {
        position: relative;
        display: flex;
        padding: 10px 15px;
        border-radius: 12px;
        box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
        background-color: var(--chat-menu-bg);
        width: fit-content;
        justify-self: flex-end;
        place-self: end flex-end;
        min-height: 400px;
        max-height: calc(95vh - 90px);
        min-width: 370px;
        max-width: 370px;
        box-shadow: var(--gifs-drop-shadow);
    }

    .gif-explorer-container {
        min-height: 400px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 100%;
        align-items: center;
        gap: 15px;
    }

    .title-row {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .gif-explorer-title {
        flex: 1;
        text-align: center;
        font-family: Roboto, sans-serif;
        letter-spacing: 0.8px;
        font-size: 25px;
        color: var(--chat-bubble-msg-color);
        margin: 0;
        user-select: none;
    }

    .explore-collections-icon {
        text-align: right;
        font-size: 20px;
        color: var(--chat-group);
        box-shadow: var(--gif-search-icon-bs);
        padding: 7px;
        background-color: var(--gif-search-icon);
        border: none;
        border-radius: 8px;
        cursor: pointer;
    }

    .create-collections-icon {
        position: absolute;
        bottom: 5px;
        left: 50%;
        transform: translateX(-50%);
        padding: 4px;
        font-size: 22px;
        background-color: var(--mdc-theme-primary);
        color: white;
        border-radius: 8px;
        box-shadow: 0 0 0 rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease-in-out;
    }

    .create-collections-icon:hover {
        cursor: pointer;
        box-shadow: 0px 4px 5px 0px hsla(0, 0%, 0%, 0.14), 0px 1px 10px 0px hsla(0, 0%, 0%, 0.12), 0px 2px 4px -1px hsla(0, 0%, 0%, 0.2);
    }

    .collections-button-row {
        width: auto;
        background-color: var(--gif-button-row-bg);
        border-radius: 35px;
        padding: 2px;
        margin-top: 10px;
    }

    .collections-button-innerrow {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .my-collections-button {
        font-size: 16px;
        font-family: 'Maven Pro', sans-serif;
        letter-spacing: 0.5px;
        color: var(--gif-button-row-color);
        border-radius: 35px;
        padding: 8px 20px;
        margin: 2px 0;
        cursor: pointer;
        user-select: none;
    }

    .subscribed-collections-button {
        font-size: 16px;
        font-family: 'Maven Pro', sans-serif;
        letter-spacing: 0.5px;
        color: var(--gif-button-row-color);
        border-radius: 35px;
        padding: 8px 20px;
        margin: 2px 0;
        cursor: pointer;
        user-select: none;
    }

    .collections-button-active {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        color: var(--mdc-theme-primary);
        border-radius: 25px;
        padding: 8px 20px;
        margin: 2px 0;
        box-shadow: rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 2px 1px -1px, rgb(0 0 0 / 20%) 0px 1px 3px 0px;
        transition: all 0.3s ease-in-out;
        cursor: auto;
    }

    .collection-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
    }

    .collection-gifs {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 10px;
        margin-top: 10px;
        overflow-y: auto;
        overflow-x: hidden;
    }

    .collection-gifs::-webkit-scrollbar-track {
        background-color: whitesmoke;
        border-radius: 7px;
    }

    .collection-gifs::-webkit-scrollbar {
        width: 6px;
        border-radius: 7px;
        background-color: whitesmoke;
    }

    .collection-gifs::-webkit-scrollbar-thumb {
        background-color: rgb(180, 176, 176);
        border-radius: 7px;
        transition: all 0.3s ease-in-out;
    }

    .collection-gif {
        border-radius: 15px;
        background-color: transparent;
        cursor: pointer;
        width: 100%;
        height: 150px;
        object-fit: cover;
        border: 1px solid transparent;
        transition: all 0.2s cubic-bezier(0, 0.55, 0.45, 1);
        box-shadow: rgb(50 50 93 / 25%) 0px 6px 12px -2px,
            rgb(0 0 0 / 30%) 0px 3px 7px -3px;
    }

    .collection-gif:hover {
        border: 1px solid var(--mdc-theme-primary);
    }

    .new-collection-row {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
    }

    .new-collection-subrow {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5px;
    }

    .new-collection-title {
        font-family: Maven Pro, sans-serif;
        color: var(--chat-bubble-msg-color);
        font-size: 18px;
        letter-spacing: 0.6px;
        margin: 0;
        user-select: none;
    }

    .new-collection-subtitle {
        font-family: Roboto, sans-serif;
        color: var(--chat-bubble-msg-color);
        font-weight: 300;
        opacity: 0.9;
        font-size: 14px;
        letter-spacing: 0.3px;
        margin: 0;
        user-select: none;
    }

    .new-collection-container {
        display: flex;
        margin: 15px 20px;
        border: 3.5px dashed #b898c1;
        border-radius: 10px;
        background-color: #d7d3db2e;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .new-collection-icon {
        font-size: 30px;
        color: var(--mdc-theme-primary);
    }

    .gifs-added-col {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        flex: 1 1 0%;
        margin-top: 10px;
        overflow-y: auto;
        max-height: 300px;
    }

    .gifs-added-row {
        display: flex;
        flex-direction: column;
        gap: 5px;
        overflow-y: auto;
    }

    .gifs-added-row .gif-input:last-child {
        border-bottom: none;
    }

    .gifs-added-row::-webkit-scrollbar-track {
        background-color: whitesmoke;
        border-radius: 7px;
    }

    .gifs-added-row::-webkit-scrollbar {
        width: 6px;
        border-radius: 7px;
        background-color: whitesmoke;
    }

    .gifs-added-row::-webkit-scrollbar-thumb {
        background-color: rgb(180, 176, 176);
        border-radius: 7px;
        transition: all 0.3s ease-in-out;
    }

    .gif-input {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
        background-color: transparent;
        padding: 15px 5px;
        border-bottom: 1px solid #7b787888;
    }

    .gif-input-img {
        width: 70px;
        height: 70px;
        border-radius: 10px;
    }

    .gif-input-field {
        height: 30px;
        background-color: transparent;
        border: none;
        color: var(--chat-bubble-msg-color);
        border-bottom: 1px solid var(--chat-bubble-msg-color);
        width: 100%;
        padding: 0;
        margin: 0;
        outline: 0;
        font-size: 16px;
        font-family: Roboto, sans-serif;
        letter-spacing: 0.3px;
        font-weight: 300;
    }

    .upload-collection-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin-top: 10px;
    }

    .upload-collection-name {
        display: block;
        padding: 8px 10px;
        font-size: 16px;
        font-family: Montserrat, sans-serif;
        font-weight: 600;
        background-color: #ebeaea21;
        border: 1px solid var(--mdc-theme-primary);
        border-radius: 5px;
        color: var(--chat-bubble-msg-color);
        outline: none;
    }

    .upload-collection-name::placeholder {
        font-size: 16px;
        font-family: Montserrat, sans-serif;
        font-weight: 600;
        opacity: 0.6;
        color: var(--chat-bubble-msg-color);
    }

    .collection-back-button {
        display: flex;
        font-family: Roboto, sans-serif;
        font-weight: 300;
        letter-spacing: 0.3px;
        font-size: 16px;
        width: fit-content;
        gap: 10px;
        color: var(--chat-bubble-msg-color);
        flex-direction: row;
        align-items: center;
        transition: box-shadow 0.2s ease-in-out;
        background-color: var(--gif-button-row-bg);
        border-radius: 3px;
        box-shadow: rgb(0 0 0 / 20%) 0px 0px 0px;
        padding: 8px 10px;
        cursor: pointer;
    }

    .collection-back-button:hover {
        border: none;
        box-sizing: border-box;
        box-shadow: rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px, rgb(0 0 0 / 20%) 0px 2px 4px -1px;
    }

    .collection-back-button-arrow {
        font-size: 10px;
    }

    .no-collections {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: var(--chat-bubble-msg-color);
        font-size: 20px;
        font-family: Paytone One, sans-serif;
        margin-top: 20px;
        user-select: none;
    }

    .collection-card {
        display: flex;
        font-family: Roboto, sans-serif;
        font-weight: 300;
        letter-spacing: 0.3px;
        font-size: 19px;
        color: var(--chat-bubble-msg-color);
        flex-direction: row;
        align-items: center;
        transition: all 0.3s ease-in-out;
        box-shadow: none;
        padding: 10px;
        cursor: pointer;
    }

    .collection-card:hover {
        border: none;
        border-radius: 5px;
        background-color: var(--gif-collection-hover-bg);
    }

    .upload-button {
        font-family: Roboto, sans-serif;
        font-size: 16px;
        color: var(--mdc-theme-primary);
        background-color: transparent;
        padding: 8px 10px;
        border-radius: 5px;
        border: none;
        transition: all 0.4s ease-in-out;
    }

    .upload-back-button {
        font-family: Roboto, sans-serif;
        font-size: 16px;
        color: #f44336;
        background-color: transparent;
        padding: 8px 10px;
        border-radius: 5px;
        border: none;
        transition: all 0.3s ease-in-out;
    }

    .upload-back-button:hover {
        cursor: pointer;
        background-color: #f4433663;
    }

    .upload-button:hover {
        cursor: pointer;
        background-color: #03a8f475;
    }

    .lds-circle {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 70px;
    }

    .lds-circle>div {
        display: inline-block;
        width: 80px;
        height: 80px;
        margin: 8px;
        border-radius: 50%;
        background: var(--mdc-theme-primary);
        animation: lds-circle 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    }

    @keyframes lds-circle {

        0%,
        100% {
            animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
        }

        0% {
            transform: rotateY(0deg);
        }

        50% {
            transform: rotateY(1800deg);
            animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
        }

        100% {
            transform: rotateY(3600deg);
        }
    }

    .gifs-loading-message {
        font-family: Montserrat, sans-serif;
        font-size: 20px;
        font-weight: 600;
        color: var(--chat-bubble-msg-color);
        margin: 0 0 10px 0;
        text-align: center;
        user-select: none;
    }

    .subscribe-button {
        position: absolute;
        bottom: 3px;
        left: 50%;
        transform: translateX(-50%);
        font-family: Raleway, sans-serif;
        font-weight: 500;
        font-size: 14px;
        background-color: var(--mdc-theme-primary);
        border: none;
        border-radius: 8px;
        outline: none;
        padding: 5px 10px;
        transition: all 0.3s cubic-bezier(0.5, 1, 0.89, 1);
    }

    .subscribe-button:hover {
        cursor: pointer;
        box-shadow: 0px 3px 4px 0px hsla(0, 0%, 0%, 0.14), 0px 3px 3px -2px hsla(0, 0%, 0%, 0.12), 0px 1px 8px 0px hsla(0, 0%, 0%, 0.2);
    }

    .unsubscribe-button {
        position: absolute;
        width: max-content;
        bottom: 3px;
        left: 50%;
        transform: translateX(-50%);
        font-family: Raleway, sans-serif;
        font-weight: 500;
        font-size: 14px;
        background-color: #f44336;
        border: none;
        border-radius: 8px;
        outline: none;
        padding: 5px 10px;
        transition: all 0.3s cubic-bezier(0.5, 1, 0.89, 1);
    }

    .unsubscribe-button:hover {
        cursor: pointer;
        box-shadow: 0px 3px 4px 0px hsla(0, 0%, 0%, 0.14), 0px 3px 3px -2px hsla(0, 0%, 0%, 0.12), 0px 1px 8px 0px hsla(0, 0%, 0%, 0.2);
    }
`

export const chatGifsExploreStyles = css`
    .container-body {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 100%;
        height: 100%;
    }

    .collection-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        max-height: 500px;
        overflow-y: auto;
        overflow-x: hidden;
    }

    .collection-wrapper::-webkit-scrollbar-track {
        background-color: whitesmoke;
        border-radius: 7px;
    }

    .collection-wrapper::-webkit-scrollbar {
        width: 6px;
        border-radius: 7px;
        background-color: whitesmoke;
    }

    .collection-wrapper::-webkit-scrollbar-thumb {
        background-color: rgb(180, 176, 176);
        border-radius: 7px;
        transition: all 0.3s ease-in-out;
    }

    .collection-card {
        display: flex;
        font-family: Roboto, sans-serif;
        font-weight: 300;
        letter-spacing: 0.3px;
        font-size: 19px;
        color: var(--chat-bubble-msg-color);
        flex-direction: row;
        align-items: center;
        transition: all 0.3s ease-in-out;
        box-shadow: none;
        padding: 10px;
        cursor: pointer;
    }

    .collection-card:hover {
        border: none;
        border-radius: 5px;
        background-color: var(--gif-collection-hover-bg);
    }

    .search-collection-name {
        display: block;
        padding: 8px 10px;
        font-size: 16px;
        font-family: Montserrat, sans-serif;
        font-weight: 600;
        background-color: #ebeaea21;
        border: 1px solid var(--mdc-theme-primary);
        border-radius: 5px;
        color: var(--chat-bubble-msg-color);
        width: 90%;
        margin: 10px 0;
        outline: none;
    }

    .search-collection-name::placeholder {
        font-size: 16px;
        font-family: Montserrat, sans-serif;
        font-weight: 600;
        opacity: 0.6;
        color: var(--chat-bubble-msg-color);
    }

    .search-collection-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        position: relative;
    }

    .explore-collections-icon {
        position: absolute;
        right: 20px;
        font-size: 13px;
        color: var(--chat-group);
        cursor: pointer;
    }

    .clear-search-icon {
        position: absolute;
        right: 15px;
        font-size: 16px;
        color: var(--chat-group);
        padding: 1px;
        border-radius: 50%;
        background-color: transparent;
        transition: all 0.3s ease-in-out;
    }

    .clear-search-icon:hover {
        cursor: pointer;
        background-color: #e4e3e389;
    }

    .gifs-loading-message {
        font-family: Montserrat, sans-serif;
        font-size: 20px;
        font-weight: 600;
        color: var(--chat-bubble-msg-color);
        margin: 0 0 10px 0;
        text-align: center;
        user-select: none;
    }

    .lds-circle {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .lds-circle>div {
        display: inline-block;
        width: 80px;
        height: 80px;
        margin: 8px;
        border-radius: 50%;
        background: var(--mdc-theme-primary);
        animation: lds-circle 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    }

    @keyframes lds-circle {
        0%,
        100% {
            animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
        }

        0% {
            transform: rotateY(0deg);
        }

        50% {
            transform: rotateY(1800deg);
            animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
        }

        100% {
            transform: rotateY(3600deg);
        }
    }
`

export const qchatStyles = css` 
    * {
        --mdc-theme-primary: rgb(3, 169, 244);
        --mdc-theme-secondary: var(--mdc-theme-primary);
        --paper-input-container-focus-color: var(--mdc-theme-primary);
        --mdc-theme-surface: var(--white);
        --mdc-dialog-content-ink-color: var(--black);
        --lumo-primary-text-color: rgb(0, 167, 245);
        --lumo-primary-color-50pct: rgba(0, 167, 245, 0.5);
        --lumo-primary-color-10pct: rgba(0, 167, 245, 0.1);
        --lumo-primary-color: hsl(199, 100%, 48%);
        --lumo-base-color: var(--white);
        --lumo-body-text-color: var(--black);
        --_lumo-grid-border-color: var(--border);
        --_lumo-grid-secondary-border-color: var(--border2);
        --mdc-dialog-min-width: 750px;
        scrollbar-width: thin;
        scrollbar-color: #6a6c75 #a1a1a1;
    }

    paper-spinner-lite {
        height: 24px;
        width: 24px;
        --paper-spinner-color: var(--mdc-theme-primary);
        --paper-spinner-stroke-width: 2px;
    }

    *,
    *:before,
    *:after {
        box-sizing: border-box;
    }

    ul {
        list-style: none;
        padding: 0;
    }

    .container {
        margin: 0 auto;
        width: 100%;
        background: var(--white);
    }

    .people-list {
        width: 20vw;
        float: left;
        height: 100vh;
        overflow-y: hidden;
        border-right: 3px #ddd solid;
    }

    .people-list .blockedusers {
        z-index: 1;
        position: absolute;
        bottom: 0;
        width: 20vw;
        background: var(--white);
        border-right: 3px #ddd solid;
        display: flex;
        justify-content: space-between;
        gap: 15px;
        flex-direction: column;
        padding: 5px 30px 0 30px;
    }

    .groups-button-container {
        position: relative;
    }

    .groups-button {
        width: 100%;
        background-color: rgb(116, 69, 240);
        border: none;
        color: white;
        font-weight: bold;
        font-family: Roboto, sans-serif;
        letter-spacing: 0.8px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        gap: 10px;
        padding: 5px 8px;
        transition: all 0.1s ease-in-out;
    }

    .groups-button-notif {
        position: absolute;
        top: -10px;
        right: -8px;
        width: 25px;
        border-radius: 50%;
        height: 25px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: Montserrat, sans-serif;
        font-size: 16px;
        color: black;
        background-color: rgb(51, 213, 0);
        user-select: none;
        transition: all 0.3s ease-in-out 0s;
    }

    .groups-button-notif:hover {
        cursor: auto;
        box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
    }

    .groups-button-notif:hover+.groups-button-notif-number {
        display: block;
        opacity: 1;
        animation: fadeIn 0.6s;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            top: -10px;
        }

        to {
            opacity: 1;
            top: -60px;
        }
    }

    .groups-button-notif-number {
        position: absolute;
        transform: translateX(-50%);
        left: 50%;
        width: 150px;
        text-align: center;
        border-radius: 3px;
        padding: 5px 10px;
        background-color: white;
        color: black;
        font-family: Roboto, sans-serif;
        letter-spacing: 0.3px;
        font-weight: 300;
        display: none;
        opacity: 0;
        top: -60px;
        box-shadow: rgb(216 216 216 / 25%) 0 6px 12px -2px, rgb(0 0 0 / 30%) 0 3px 7px -3px;
    }

    .groups-button:hover {
        cursor: pointer;
        filter: brightness(120%);
    }

    .people-list .search {
        padding-top: 20px;
        padding-left: 20px;
        padding-right: 20px;
        display: flex;
        align-items: center;
        gap: 10px;
        justify-content: space-between;
    }

    .center {
        margin: 0;
        position: absolute;
        padding-top: 12px;
        left: 50%;
        -ms-transform: translateX(-50%);
        transform: translateX(-50%);
    }

    .people-list .create-chat {
        border-radius: 5px;
        border: none;
        color: #fff;
        width: 100%;
        font-size: 15px;
        text-align: center;
        cursor: pointer;
        display: flex;
        flex: 0;
    }

    .people-list .create-chat:hover {
        opacity: .8;
        box-shadow: 0 3px 5px rgba(0, 0, 0, .2);
    }

    .people-list ul {
        padding: 0 0 60px 0;
        height: 85vh;
        overflow-y: auto;
        overflow-x: hidden;
    }

    .people-list ul::-webkit-scrollbar-track {
        background: #a1a1a1;
    }

    .people-list ul::-webkit-scrollbar {
        width: 11px;
    }

    .people-list ul::-webkit-scrollbar-thumb {
        background-color: #6a6c75;
        border-radius: 6px;
        border: 3px solid #a1a1a1;
    }

    .chat {
        width: 80vw;
        height: 100vh;
        float: left;
        background: var(--white);
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        color: #434651;
        box-sizing: border-box;
    }

    .chat .new-message-bar {
        display: flex;
        flex: 0 1 auto;
        align-items: center;
        justify-content: space-between;
        padding: 0 25px;
        font-size: 14px;
        font-weight: 500;
        top: 0;
        position: absolute;
        left: 20vw;
        right: 0;
        z-index: 5;
        background: var(--tradehead);
        color: var(--white);
        border-radius: 0 0 8px 8px;
        min-height: 25px;
        transition: opacity .15s;
        text-transform: capitalize;
        opacity: .85;
        cursor: pointer;
    }

    .chat .new-message-bar:hover {
        opacity: .75;
        transform: translateY(-1px);
        box-shadow: 0 3px 7px rgba(0, 0, 0, .2);
    }

    .hide-new-message-bar {
        display: none !important;
    }

    .chat .chat-history {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 100%;
        left: 20vw;
        border-bottom: 2px solid var(--white);
        overflow-y: hidden;
        height: 100vh;
        box-sizing: border-box;
    }

    .chat .chat-message {
        padding: 10px;
        height: 10%;
        display: inline-block;
        width: 100%;
        background-color: #eee;
    }

    .chat .chat-message textarea {
        width: 90%;
        border: none;
        font-size: 16px;
        padding: 10px 20px;
        border-radius: 5px;
        resize: none;
    }

    .chat .chat-message button {
        float: right;
        color: #94c2ed;
        font-size: 16px;
        text-transform: uppercase;
        border: none;
        cursor: pointer;
        font-weight: bold;
        background: #f2f5f8;
        padding: 10px;
        margin-top: 4px;
        margin-right: 4px;
    }

    .chat .chat-message button:hover {
        color: #75b1e8;
    }

    .online,
    .offline,
    .me {
        margin-right: 3px;
        font-size: 10px;
    }

    .clearfix:after {
        visibility: hidden;
        display: block;
        font-size: 0;
        content: " ";
        clear: both;
        height: 0;
    }

    .red {
        --mdc-theme-primary: red;
    }

    h2 {
        margin: 0;
    }

    h2,
    h3,
    h4,
    h5 {
        color: var(--black);
        font-weight: 400;
    }

    [hidden] {
        display: hidden !important;
        visibility: none !important;
    }

    .details {
        display: flex;
        font-size: 18px;
    }

    .title {
        font-weight: 600;
        font-size: 12px;
        line-height: 32px;
        opacity: 0.66;
    }

    .textarea {
        width: 100%;
        border: none;
        display: inline-block;
        font-size: 16px;
        padding: 10px 20px;
        border-radius: 5px;
        height: 120px;
        resize: none;
        background: #eee;
    }

    .dialog-container {
        position: relative;
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 0 10px;
        gap: 10px;
        height: 100%;
    }

    .dialog-header {
        color: var(--chat-bubble-msg-color);
    }

    .dialog-subheader {
        color: var(--chat-bubble-msg-color);
    }

    .modal-button-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
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
        color: #F44336;
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
        transition: all 0.3s ease-in-out;
        background: none;
        border-radius: 50%;
        padding: 6px 3px;
        font-size: 21px;
    }

    .search-icon:hover {
        cursor: pointer;
        background: #d7d7d75c;
    }

    .search-results-div {
        position: absolute;
        top: 25px;
        right: 25px;
    }

    .user-verified {
        position: absolute;
        top: 0;
        right: 5px;
        display: flex;
        align-items: center;
        gap: 10px;
        color: #04aa2e;
        font-size: 13px;
    }
`