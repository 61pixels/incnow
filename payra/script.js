var _futureformurl = "/future";
var _accountid, _authkey, _sessionid, _serverurl;
var _cookiesettings = { expires: 365, path: "/", domain: "incnow.com" };
var _iseditingcard = false;
var _countries = [];
var _products = [];
var _invoices = [];

function formatMoney(n) { var c = 2, d = ".", t = ",", s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0; return "$" + s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "") }
function getUnitPrice(productid, key) {
    var up = 0;
    var pArr = $.grep(_products, function (item, i) { return item.id == productid; });
    if (!pArr.length) return up;
    var p = pArr[0];

    var sid = key ? key.split("-")[0] : null;
    var eid = key ? key.split("-")[1] : null;

    $.each(p.fees, function (fi, fitem) {
        var sitem = apiType("stateTypes", fitem.stateType);
        var eitem = apiType("entityTypes", fitem.entityType);

        if ((sitem == null || sitem.id == sid) && (eitem == null || eitem.id == eid)) {
            up += fitem.amount;
        }
    });

    return up;
}
function initCountriesAndStates() {
    //get dataset
    $.ajax({
        type: "GET",
        url: _baseapiurl + "/dataset/country",
        success: function (msg) {
            _countries = msg;

            //create selects
            var $all = $("<select>");
            $.each(_countries, function (i, item) {
                $all.append($("<option>").val(item.name).text(item.name));
            });

            //init country select
            $("#contact_country_control").html($all.html()).on("change", function () {
                var countryName = $(this).val();
                var stateSelectName = $(this).attr("id").replace("country", "state");
                var stateSelect = $("#" + stateSelectName + "_select");
                var stateText = $("#" + stateSelectName);

                var c = $.grep(_countries, function (item, i) { return item.name == countryName })[0];

                if (c.states.length) {
                    var ss = $("<select>");
                    ss.append($("<option>").val("").text("Choose One..."));
                    $.each(c.states, function (i, item) { ss.append($("<option>").val(item.abbreviation).text(item.name)); });

                    stateText.hide();
                    stateSelect.html(ss.html()).show();
                }
                else {
                    stateSelect.hide();
                    stateText.val("").show();
                };
            }).trigger("change");
        }
    });
};
function getContactInfo() {
    var ci = {};
    ci.firstName = $("#contact_first_name_control").val() || "";
    ci.lastName = $("#contact_last_name_control").val() || "";
    ci.streetAddress = $("#contact_address_control").val() || "";
    ci.city = $("#contact_city_control").val() || "";
    ci.state = $("#contact_state_control").val() || "";
    ci.postal = $("#contact_postal_control").val() || "";
    ci.country = $("#contact_country_control").val() || "";
    ci.email = $("#contact_email_control").val() || "";
    ci.phone = $("#contact_phone_control").val() || "";

    if (ci.firstName != "" && ci.lastName == "") {
        ci.lastName = ci.firstName;
        ci.firstName = "";
    }

    return ci;
};
function setContactInfo(ci) {
    if (!ci) return;

    //set editable
    $("#contact_first_name_control").val(ci.firstName);
    $("#contact_last_name_control").val(ci.lastName);
    $("#contact_address_control").val(ci.streetAddress ? ci.streetAddress.split("\n").join(", ") : null);
    $("#contact_city_control").val(ci.city);
    $("#contact_postal_control").val(ci.postal).trigger("change");
    $("#contact_email_control").val(ci.email);
    $("#contact_phone_control").val(ci.phone);

    var c = ci.country;
    if (c) {
        var $country = $("#contact_country_control");
        $country.find("option").each(function (i, item) {
            var $o = $(item);
            if ($o.val().toUpperCase() == c.toUpperCase() || $o.text().toUpperCase() == c.toUpperCase()) {
                $country.val($o.val());
                return false;
            };
        });
        $country.trigger("change");
    };

    var s = ci.state;
    if (s) {
        var $state = $("#contact_state_control_select");
        $state.find("option").each(function (i, item) {
            var $o = $(item);
            if ($o.val().toUpperCase() == s.toUpperCase() || $o.text().toUpperCase() == s.toUpperCase()) {
                $state.val($o.val());
                return false;
            };
        });
        $state.trigger("change");
        $("#contact_state_control").val(ci.state).trigger("change");
    };

    //set readonly
    var lines = [];
    if (ci.firstName && ci.lastName) lines.push(ci.firstName + " " + ci.lastName);
    else if (ci.lastName) lines.push(ci.lastName);
    if (ci.streetAddress) $.each(ci.streetAddress.split("\n"), function (i, item) { lines.push(item); });
    if (ci.city && ci.state && ci.postal) lines.push(ci.city + ", " + ci.state + " " + ci.postal);
    else $.each([ci.city, ci.state, ci.postal], function (i, item) { if (item) lines.push(item); });
    if (ci.country) lines.push(ci.country);
    if (ci.email) lines.push(ci.email);
    if (ci.phone) lines.push(ci.phone);
    $("#contact_readonly").html(lines.join("<br/>"));
};
function setDefaultBillingContactInfo(ci) {
    if (!ci) return;

    //set card
    $("#payment_new_card_first_name_control").val(ci.firstName);
    $("#payment_new_card_last_name_control").val(ci.lastName);
    $("#payment_new_card_postal_control").val(ci.postal)
};
function getInvoiceItemPayments() {
    var pay_now = apiType("actions", "PayNow");
    var pay_later = apiType("actions", "PayLater");

    var arr = [];

    $("[data-invoiceitem]").each(function (i, item) {
        var $item = $(item);
        var a = $item.prop("checked") ? pay_now.id : pay_later.id;
        var o = $item.data("outstanding") || 0;
        
        var ii = {};
        ii.id = $item.data("invoiceitem");
        ii.actionType = a;
        ii.amount = a == pay_now.id ? o : 0;
        arr.push(ii);
    });

    return arr;
};
function getPayment() {
    var p = {};

    p.paymentMethodType = $(":radio[name='payment_method']:checked").val();
    p.id = (p.paymentMethodType == 0) ? $("#payment_card_control").val() : "";

    return p;
};
function getPayRaPayment() {
    var o = {};

    //account
    o.account = getAccount();

    //payment
    o.payment = getPayment();

    //contact
    o.contactInfo = getContactInfo();

    //invoice item payments
    o.invoiceItemPayments = getInvoiceItemPayments();

    return o;
};
function getAccount() {
    if (_accountid) {
        var a = {};
        a.id = _accountid;
        a.authKey = _authkey;
        return a;
    }
    else {
        return null;
    }
};
function setAccount(accountid, authkey) {
    _accountid = accountid || null;
    _authkey = authkey || null;
    $.cookie("accountid", _accountid, _cookiesettings);
};
function upsertProfileCard(c) {
    if (!c) return;

    var $o = $("<option>").val(c.profileId).text(c.name);
    var $paymentcardcontrol = $("#payment_card_control");

    var existing_option_found = false;
    $paymentcardcontrol.find("option").each(function (i, item) {
        var $item = $(item);
        if ($item.val() == $o.val()) {
            $item.text($o.text());
            existing_option_found = true;
            return false;
        };
    });
    if (!existing_option_found) $paymentcardcontrol.find("option:first").after($o);

    $paymentcardcontrol.val(c.profileId).trigger("change");
    $("#payment_type_credit_card_wrapper").show();
};
function setPaymentProfiles(p) {
    if (!p) return;
    $.each(p.paymentProfiles.reverse(), function (i, item) { upsertProfileCard(item); });
};
function setInvoices(invoices, selections) {
    var select_invoice = selections ? selections.invoice : null;
    var select_invoice_item = selections ? selections.invoiceItem : null;

    var $invoice_number = $("<div>").css({ "float": "left", "width": "50%" }).append($("<label>").text("Invoice"));
    var $invoice_date = $("<div>").css({ "float": "left", "width": "50%" }).addClass("text-right-small-only").append($("<label>").text("Date"));
    var $invoice = $("<div>").addClass("four columns").append($invoice_number).append($invoice_date);

    var $entity = $("<div>").addClass("four columns").append($("<div>").append($("<label>").text("Entity")));

    var $product_name = $("<div>").css({ "float": "left", "width": "50%" }).append($("<label>").text("Service"));
    var $item_outstanding = $("<div>").css({ "float": "left", "width": "25%", "text-align": "right" }).append($("<label>").text("Balance"));
    var $action = $("<div>").css({ "float": "left", "width": "25%", "text-align": "right" }).append($("<label>").text("Action"));
    var $product = $("<div>").addClass("four columns").append($product_name).append($item_outstanding).append($action);

    var $th = $("<div>").addClass("row invoice_item_row_header").append($invoice).append($entity).append($product);

    var $t = $("<div>").append($th);
    $.each(invoices, function (i, invoice) {
        $.each(invoice.items, function (ii, item) {
            var invoice_number = invoice.number;
            var invoice_date = new Date(invoice.date);
            var entity_name = item.entityInfo.name;
            var entity_state = item.entityInfo.stateType;
            var entity_number = item.entityInfo.fileNumber;
            var product_name = item.product.name;
            var item_outstanding = item.outstanding;

            if (!item.entityInfo.active) return true;

            var item_is_pending = item_outstanding > 0 ? false : true;

            var action_control_id = "pay_control_" + item.id;

            var $invoice_number = $("<div>").css({ "float": "left", "width": "50%" }).append($("<label>").attr("for", action_control_id).text(invoice_number));
            var $invoice_date = $("<div>").css({ "float": "left", "width": "50%" }).addClass("text-right-small-only").append($("<label>").attr("for", action_control_id).text(invoice_date.toLocaleDateString()));
            var $invoice = $("<div>").addClass("four columns").append($invoice_number).append($invoice_date);

            var $entity = $("<div>").addClass("four columns").append($("<div>").append($("<label>").attr("for", action_control_id).text(entity_name + " (" + entity_state + " " + entity_number + ")")));

            var $action_control = $("<input>").attr({ "type": "checkbox", "id": action_control_id, "data-invoiceitem": item.id, "data-outstanding": item_outstanding }).on("click change", function () { refreshTotal(); });
            if ((!select_invoice && !select_invoice_item) || select_invoice == invoice.id || select_invoice_item == item.id) $action_control.prop("checked", true);
            if (item_is_pending) $action_control.prop("disabled", true).css("display", "none");
            var $action_label = $("<label>").attr("for", action_control_id).text(item_is_pending ? "PENDING" : "Pay").append($action_control);

            var $product_name = $("<div>").css({ "float": "left", "width": "50%" }).append($("<label>").attr("for", action_control_id).text(product_name));
            var $item_outstanding = $("<div>").css({ "float": "left", "width": "25%", "text-align": "right" }).append($("<label>").attr("for", action_control_id).text(formatMoney(item_outstanding)));
            var $action = $("<div>").css({ "float": "left", "width": "25%", "text-align": "right" }).append($action_label);
            var $product = $("<div>").addClass("four columns").append($product_name).append($item_outstanding).append($action);

            var $tr = $("<div>").addClass("row invoice_item_row " + (item_is_pending ? "invoice_item_row_pending" : "")).append($invoice).append($entity).append($product);
            $t.append($tr);
        });
    });

    $("#invoices_table_wrapper").append($t);
    refreshTotal();
};
function hideLoadingDialog() {
    $("#modal_loading").foundation("reveal", "close");
};
function showLoadingDialog(msg) {
    $("#modal_loading_message").text(msg);
    var $modal = $("#modal_loading");
    if (!$modal.is(".open")) $modal.foundation("reveal", "open");
};
function showErrorDialog(msg) {
    $("#modal_error_message").text(msg);
    var $modal = $("#modal_error");
    if (!$modal.is(".open")) $modal.foundation("reveal", "open");
};
function submitCreditCard(successCallback) {
    //gather card information
    var id = $("#payment_card_control").val();
    var cc = {};
    if (id.length) cc.profileId = id;
    cc.account = getAccount();
    cc.cardNumber = $("#payment_new_card_number_control").val().replace(/\D/g, '');
    cc.firstName = $("#payment_new_card_first_name_control").val();
    cc.lastName = $("#payment_new_card_last_name_control").val();
    cc.expirationMonth = $("#payment_new_card_expiration_month_control").val();
    cc.expirationYear = $("#payment_new_card_expiration_year_control").val();
    cc.cvv = $("#payment_new_card_cvv_control").val().replace(/\D/g, '');
    cc.billingZip = $("#payment_new_card_postal_control").val();

    //submit card
    var url = _baseapiurl + (id.length ? "/updatecreditcard" : "/newcreditcard");
    $.ajax({
        url: url,
        data: JSON.stringify(cc),
        beforeSend: function (x, s) {
            //show loading dialog
            showLoadingDialog("Please allow up to 30 seconds for your credit card to be validated.");
        },
        success: function (msg) {
            //add new card
            debug.log(msg);
            upsertProfileCard(msg);
            $("#payment_new_card_wrapper :text").val("");
            successCallback();
        },
        error: function (x, e) {
            hideLoadingDialog();
            //display error
            debug.error(x, e);
            var msg = "Unable to validate credit card";
            if (x) {
                var rt = $.parseJSON(x.responseText);
                if (rt) if (rt.ExceptionMessage) msg = rt.ExceptionMessage;
            }
            showErrorDialog(msg);
        }
    });
};
function submitPayRaPayment() {
    var o = getPayRaPayment();
    var url = _sessionid ? $.param.querystring(_baseapiurl + "/payra", { sessionId: _sessionid, serverUrl: _serverurl }) : _baseapiurl + "/payra";
    debug.log("submitting payrapayment", o, url);

    $.ajax({
        url: url,
        data: JSON.stringify(o),
        beforeSend: function (x, s) {
            //show loading dialog
            showLoadingDialog("Please allow up to 30 seconds for your payment to be securely encrypted with 128-bit encryption and sent to our secure server.");
        },
        success: function (msg) {
            debug.log(msg);

            //hide form
            $("#form_pane").hide();

            //show thank you
            $("#thank_you_pane").show();

            //thank you info
            $("#thank_you_transaction").text(msg.name);
            $("#thank_you_amount").text(formatMoney(msg.amount));
            $("#thank_you_payment").text(msg.paymentMethodTypeName + ((msg.paymentProfileName) ? " " + msg.paymentProfileName : ""));
            $("#btn_new_order").attr("href", $.param.querystring(_futureformurl, {
                id: _accountid,
                key: _authkey,
                utm_source: "payment_thank_you",
                utm_medium: "payment_thank_you",
                utm_campaign: "payment_thank_you"
            }));

            //thank you cta
            var a = getAccount();
            var d = {};
            d.accountId = a.id;
            d.authKey = a.authKey;
            d.relatedId = msg.id;

            $.ajax({
                type: "GET",
                data: d,
                url: _baseapiurl + "/reviewurl",
                success: function (msg) {
                    $("#iframe_review").attr("src", msg);
                    $("#btn_thank_you_cta").on("click", function () {
                        $("#modal_review").foundation("reveal", "open");
                    });
                }
            });

            //scroll to top
            scrollTo(0, 0);

            //conversion payment item info
            var pay_now = apiType("actions", "PayNow");
            var oitems = [];
            $.each(o.invoiceItemPayments, function (iipi, iipitem) {
                if (iipitem.actionType != pay_now.id || iipitem.amount <= 0) return true;
                var invoice_item_found = false;
                $.each(_invoices, function (invoice_i, invoice) {
                    $.each(invoice.items, function (invoice_item_i, invoice_item) {
                        if (invoice_item.id == iipitem.id) {
                            var ei = invoice_item.entityInfo;
                            var p = invoice_item.product;
                            var s = apiType("stateTypes", ei.stateType);
                            var e = apiType("entityTypes", ei.type);
                            
                            var oitem = {};
                            oitem.productId = p.id;
                            oitem.productName = p.name;
                            oitem.quantity = invoice_item.quantity;
                            oitem.unitPrice = invoice_item.unitPrice;
                            oitem.stateName = s.label;
                            oitem.entityName = e.label;
                            oitems.push(oitem);

                            invoice_item_found = true;
                        };
                        if (invoice_item_found) return false;
                    });
                    if (invoice_item_found) return false;
                });
            });

            //google tag manager
            var gtm_transaction = {
                'id': msg.id,
                'affiliation': '',
                'revenue': msg.amount,
                'tax': '',
                'shipping': '',
                'coupon': ''
            };
            var gtm_products = [];
            $.each(oitems, function (i, item) {
                gtm_products.push({
                    'name': item.productName,
                    'id': item.productId,
                    'price': item.unitPrice,
                    'brand': '',
                    'category': item.stateName + " " + item.entityName,
                    'variant': '',
                    'quantity': item.quantity,
                    'coupon': ''
                });
            });
            var gtm_purchase = {
                'actionField': gtm_transaction,
                'products': gtm_products
            };
            var gtm_ecommerce = {
                'purchase': gtm_purchase
            };
            var gtm_item = {
                'ecommerce': gtm_ecommerce
            };
            debug.log("pushing gtm item", gtm_item);
            dataLayer.push(gtm_item);
            dataLayer.push({ 'event': 'payraTransaction' });
        },
        error: function (x, e) {
            //display error
            debug.error(x, e);
            var msg = "Unable to submit payment";
            if (x) {
                var rt = $.parseJSON(x.responseText);
                if (rt) if (rt.ExceptionMessage) msg = rt.ExceptionMessage;
            }
            showErrorDialog(msg);
            $("#btn_edit_card_wrapper").show();
        },
        complete: function (x, t) {
            //hide loading dialog
            hideLoadingDialog();
        }
    });
};

function refreshTotal() {
    var t = 0;

    var iips = getInvoiceItemPayments();
    $.each(iips, function (i, item) {
        t += item.amount;
    });

    $("#btn_checkout").prop("disabled", t <= 0);
    
    if (t > 0) {
        $("[data-productid]:checked").each(function (i, item) {
            var $item = $(item);
            var pid = $item.data("productid");
            var p = getUnitPrice(pid);
            t += p;
        });
    };

    $("#checkout_total").text(formatMoney(t));
};

function initLookup() {
    $("#btn_acount_lookup").on("click", function () {
        var $wrapper = $("");
        $(":input[required]:visible").each(function (i, item) {
            var $input = $(item);
            if ($input.val() == "") {
                $wrapper = $input.closest("[data-requiredwrapper]");
                return false;
            };
        });
        if ($wrapper.length) {
            $wrapper[0].scrollIntoView();
            showErrorDialog("Please fill out all fields");
            return;
        };

        var d = {};
        d.outstandingInvoice = $("#account_invoice_control").val();
        d.code = $("#account_code_control").val();
        $.ajax({
            url: _baseapiurl + "/lookupaccount",
            data: JSON.stringify(d),
            success: function (msg) {
                if (msg.id) {
                    debug.log(msg);
                    var a = {};
                    a.id = msg.id;
                    a.key = msg.authKey;
                    location.href = $.param.querystring(location.href, a);
                }
                else {
                    hideLoadingDialog();
                    showErrorDialog("Invalid Lookup");
                };
            },
            error: function (x, e) {
                debug.error(x);
                showErrorDialog("Unable To Authenticate");
            }
        });
    });

    var $modal = $("#modal_forgot");

    $("#btn_forgot_account").on("click", function () {
        var d = {};
        d.email = $("#forgot_email_control").val();

        $modal.foundation("reveal", "close");
        setTimeout(function () {
            showLoadingDialog("Looking Up Account");
            $.ajax({
                type: "POST",
                url: _baseapiurl + "/remindaccount",
                data: JSON.stringify(d),
                success: function (msg) {
                    debug.log(msg);
                    if (msg == "success") {
                        $("#forgot_form_panel").hide();
                        $("#forgot_success_panel").show();
                    }
                    else {
                        setTimeout(function () { alert("Unable To Find Outstanding Account"); }, 333);
                    };
                },
                error: function (x, e) {
                    debug.error(x);
                    setTimeout(function () { alert("Error Looking Up Account"); }, 333);
                },
                complete: function () {
                    hideLoadingDialog();
                    setTimeout(function () { $modal.foundation("reveal", "open"); }, 250);
                }
            });
        }, 250);
    });

    $("#btn_forgot_dialog").on("click", function () {
        $modal.foundation("reveal", "open");
    });
};

function initContact() {
    $("#cbx_same_contact").on("click", function () {
        $("#contact_editable_wrapper").show();
        $("#contact_readonly_wrapper").hide();
    });

    //state select sets underlying input
    $("#contact_state_control_select").on("change", function () {
        var stateName = $(this).val();
        var stateTextName = $(this).attr("id").replace("_select", "");
        var stateText = $("#" + stateTextName);
        stateText.val(stateName);
    });

    initCountriesAndStates();
};

function initPayment() {
    var $paymentmethods = $(":radio[name='payment_method']");
    var $paymenttypewrappers = $(".payment_type_wrapper");
    var $paymentcard = $("#payment_card_control");
    var $paymentcardwraper = $("#payment_new_card_wrapper");
    var $btneditcard = $("#btn_edit_card");

    $paymentmethods.on("click change", function () {
        var type = $paymentmethods.filter(":checked").val();

        $paymenttypewrappers.each(function (i, item) {
            var $item = $(item);
            var show = $item.data("paymenttype") == type;
            $item.toggle(show);
        });

        refreshTotal();
    }).trigger("change");

    $paymentcard.on("change", function () {
        var is_new_card = $paymentcard.val() == "";
        $paymentcardwraper.toggle(is_new_card);
        $btneditcard.prop("disabled", is_new_card);
        _iseditingcard = false;
    }).trigger("change");

    $btneditcard.on("click", function () {
    	$paymentcardwraper.show();
    	_iseditingcard = true;
    });
};

function initCheckout() {
    $("#btn_checkout").on("click", function () {
        //tou
        if (!$("#tou_agree").prop("checked")) {
            showErrorDialog("Please agree to the Terms of Use");
            return;
        };

        //form inputs
        var $wrapper = $("");
        $(":input[required]:visible").each(function (i, item) {
            var $input = $(item);
            if ($input.val() == "") {
                $wrapper = $input.closest("[data-requiredwrapper]");
                return false;
            };
        });
        if ($wrapper.length) {
            $wrapper[0].scrollIntoView();
            showErrorDialog("Please fill out all fields");
            return;
        };

        //create card if needed
        var p = getPayment();
        if (p.paymentMethodType == 0 && (!p.id.length || _iseditingcard)) {
            //create and submit upon success
            submitCreditCard(submitPayRaPayment);
        }
        else {
            //submit
            submitPayRaPayment();
        };
    });
};

function finishSetup() {
    var qs = $.deparam.querystring(true);

    var selections = {};
    if (qs.invoice) selections.invoice = qs.invoice;
    if (qs.invoiceItem) selections.invoiceItem = qs.invoiceItem;

    if (qs.sessionId && qs.serverUrl) {
        _sessionid = qs.sessionId;
        _serverurl = qs.serverUrl;
        $("body").addClass("chromeless");
    };

    if (qs.id && qs.key) {
        var d = {};
        d.id = qs.id;
        d.authKey = qs.key;
        showLoadingDialog("Loading Invoices");
        $.ajax({
            type: "GET",
            url: _baseapiurl + "/payra",
            data: d,
            success: function (msg) {
                debug.log(msg);
                var a = msg.account || {};
                var is = msg.invoices || [];
                if (a.id) {
                    if (is.length) {
                        setAccount(a.id, d.authKey);
                        setInvoices(is, selections);
                        setContactInfo(a.contactInfo);
                        setPaymentProfiles(a.anetProfile);
                        $("#auth_pane").hide();
                        $("#form_pane").show();
                        _invoices = is;
                        if (_sessionid) setDefaultBillingContactInfo(a.contactInfo);
                    }
                    else {
                        setTimeout(function () { showErrorDialog("No Unpaid Invoices Found"); }, 250);
                    };
                }
                else {
                    setTimeout(function () {showErrorDialog("Invalid Credentials"); }, 250);
                };
            },
            error: function (x, e) {
                debug.error(x);
                setTimeout(function () { showErrorDialog("Unable To Authenticate"); }, 250);
            },
            complete: function () {
                hideLoadingDialog();
            }
        });
    };

    $.ajax({
        type: "GET",
        url: _baseapiurl + "/product",
        success: function (msg) {
            _products = msg;

            $("[data-productidpriceplaceholder]").each(function (i, item) {
                var $item = $(item);
                var pid = $item.data("productidpriceplaceholder");
                var price = getUnitPrice(pid);
                $item.text(formatMoney(price));
            });
        }
    });
};

function init() {
    initLookup();

    initContact();

    initPayment();
    
    initCheckout();

    finishSetup();
};

$(function () {
	//$.ajax defaults
	$.ajaxSetup({
		type: "POST",
		data: "{}",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		async: true,
		cache: false,
		success: function (msg) {
			debug.log(msg);
		},
		error: function (x, e) {
			debug.error(x);
		}
	});

	init();
});
