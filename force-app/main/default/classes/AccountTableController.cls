public with sharing class AccountTableController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(String searchText) {
        String query = 'SELECT Id, Name FROM Account';
        if (!String.isBlank(searchText))
        {
            searchText = '%' + searchText + '%';
            query += ' WHERE Name LIKE: searchText';
        }
        return Database.query(String.escapeSingleQuotes(query));   
    }
}