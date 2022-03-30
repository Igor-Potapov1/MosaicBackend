const countryList = require('country-list');

const mockData = require('../../mockData/mockData');
const facilityCountry = require('../../mockData/Tbl_FacilityCountry.json');
const baseLineData = require('../../mockData/Tbl_POBaseline.json');
const facilities = require('../../mockData/Tbl_POFacilities.json');

const getMaps = async (req, res) => {
  try {
    const facDataArray = [];
    const facDataObj = {};

    facilityCountry.forEach((facCountry) => {
      facilities
        .filter((item) => item['PO Factory'] === facCountry['Facility Name'])
        .forEach((item) => {
          facDataArray.push({
            country: facCountry['Facility Country'],
            value:
              Math.trunc(
                baseLineData
                  .filter(
                    (baseItem) => baseItem['PO Number'] === item['PO Number'],
                  )
                  .reduce(
                    (prev, curr) =>
                      prev + parseFloat(curr['Material Weight (t)']),
                    0,
                  ) * 100,
              ) / 100,
          });
        });
    });

    facDataArray.forEach((item) => {
      facDataObj[item.country] =
        facDataObj[item.country] + item.value || 0 + item.value;
    });

    const counriesWithCodes = {};

    countryList.getData().forEach((d) => {
      if (facDataObj[d.name]) {
        counriesWithCodes[d.code] = facDataObj[d.name];
        return d;
      }
    });

    const response = {
      factoryMap: facilityCountry,
      materialsMap: counriesWithCodes,
      table: mockData.supplierTableData,
    };

    res.status(200).json(response);
  } catch (error) {
    res.json(error);
  }
};

module.exports = getMaps;
