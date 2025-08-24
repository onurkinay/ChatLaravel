const selectedUser = document.querySelector(
    'meta[name="selected_user"]'
).content;
const authId = document.querySelector('meta[name="auth_id"]').content;
const baseUrl = document.querySelector('meta[name="baseUrl"]').content;
const inbox = $(".messages ul");
function toggleLoader() {
    $(".loader").toggle();
}

function messageTemplate(text, className) {
    return `
         <li class="${className}">
     <img src="/anon.png" alt="" />
     <p>${text}
     </p>
 </li>

    `;
}

function fetchMessages() {
    const selectedUser = document.querySelector(
        'meta[name="selected_user"]'
    ).content;

    $.ajax({
        url: baseUrl + "/fetch-messages",
        method: "GET",
        data: {
            user_id: selectedUser,
        },
        beforeSend: function () {
            toggleLoader();
        },
        success: function (data) {
            setContactInfo(data.contact);
            //append messages
            inbox.html("");
            data.messages.forEach((message) => {
                inbox.append(
                    messageTemplate(
                        message.message,
                        message.to_id == selectedUser ? "replies" : "sent"
                    )
                );
            });
        },
        error: function (xhr, status, error) {
            // Handle error
        },
        complete: function () {
            toggleLoader();
        },
    });
}

function sendMessage() {
    const selectedUser = document.querySelector(
        'meta[name="selected_user"]'
    ).content;
    let formData = $(".message-form").serialize();
    let messageBox = $(".message-box");
    $.ajax({
        url: baseUrl + "/send-message",
        method: "POST",
        data: formData + "&contact_id=" + selectedUser,
        beforeSend: function () {
            let message = messageBox.val();
            inbox.append(messageTemplate(message, "replies"));
        },
        success: function (data) {
            $(".message-input input").val("");
        },
        error: function (xhr, status, error) {},
        complete: function () {},
    });
}

function setContactInfo(user) {
    $(".contact-name").text(user.name);
}

$(document).ready(function () {
    $(".contact").on("click", function () {
        const userId = $(this).data("id");
        $('meta[name="selected_user"]').attr("content", userId);
        toggleLoader();
        fetchMessages();
    });

    $(".message-form").on("submit", function (e) {
        e.preventDefault();
        sendMessage();
    });
});

//listen to the live events
window.Echo.private(`message.${authId}`).listen("SendMessageEvent", (e) => {
    inbox.append(
        messageTemplate(e.text, e.id === selectedUser ? "replies" : "sent")
    );
});
