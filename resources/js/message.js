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
});
