const selectedUser = document.querySelector(
    'meta[name="selected_user"]'
).content;
const baseUrl = document.querySelector('meta[name="baseUrl"]').content;

function toggleLoader() {
    $(".loader").toggle();
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
    $.ajax({
        url: baseUrl + "/send-message",
        method: "POST",
        data: formData + "&contact_id=" + selectedUser,
        beforeSend: function () {},
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
    toggleLoader();
    $(".contact").on("click", function () {
        const userId = $(this).data("id");
        $('meta[name="selected_user"]').attr("content", userId);
        fetchMessages();
    });

    $(".message-form").on("submit", function (e) {
        e.preventDefault();
        sendMessage();
    });
});
