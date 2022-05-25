sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     * @param {typeof sap.ui.model.Filter} Filter
     * @param {typeof sap.ui.model.FilterOperator} FilterOperator
     */
    function (Controller, JSONModel, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("projects.invoices.controller.MainView", {
            onInit: function () {
                let path = "../model/selectionScreenMenu.json";
                const oModel = new JSONModel();
                oModel.loadData(path);
                this.getView().setModel(oModel, "selectionCountryScreen");
            },
            onFilter: function (oEvent) {
                console.log("filtro", oEvent);
                const oData = this.getView().getModel("selectionCountryScreen").getData();
                let filters = [];
                if(oData.shipName !== ""){
                    filters.push(new Filter("ShipName", FilterOperator.Contains, oData.shipName));
                }
                if(oData.countryKey !== ""){
                    filters.push(new Filter("Country", FilterOperator.EQ, oData.countryKey));
                }
                const oList = this.getView().byId("invoicesList");
                const oBinding = oList.getBinding("items");
                oBinding.filter(filters);
            },
            onCleanFilter: function () {
                const oModel = this.getView().getModel("selectionCountryScreen");
                oModel.setProperty("/shipName", "");
                oModel.setProperty("/countryKey", "");

                const oList = this.getView().byId("invoicesList");
                const oBinding = oList.getBinding("items");
                oBinding.filter([]);
            }
        });
    });
