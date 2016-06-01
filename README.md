## Migrate GeoServer styles

This script migrates styles from one GeoServer to another using the REST API.

### Limitations

* If you delete a style through the web interface, you can't create another style using that name, because the file still exists on disk.
* POST can't replace styles, and PUT can't create new ones. So use the 'replacing' boolean switch to set the mode you need.