
delete from sym_node_group;
insert into sym_node_group (node_group_id,description) 
 values ('master','group that represents the registration server and server node');
insert into sym_node_group (node_group_id,description) 
 values ('slaver','group that represents multiple client nodes');

delete from sym_node_group_link;
insert into sym_node_group_link (source_node_group_id,target_node_group_id,data_event_action) 
 values ('slaver','master','P');
insert into sym_node_group_link (source_node_group_id,target_node_group_id,data_event_action) 
 values ('master','slaver','W');

delete from sym_node;
insert into sym_node (node_id,node_group_id,external_id,sync_enabled,sync_url,schema_version,symmetric_version,database_type,database_version,heartbeat_time,timezone_offset,batch_to_send_count,batch_in_error_count,created_at_node_id) 
 values ('master','master','master',1,null,null,null,null,null,current_timestamp,null,0,0,'master');
 
delete from sym_node_security;
insert into sym_node_security (node_id,node_password,registration_enabled,registration_time,initial_load_enabled,initial_load_time,created_at_node_id) 
 values ('master','5d1c92bbacbe2edb9e1ca5dbb0e481',0,current_timestamp,0,current_timestamp,'master');

delete from sym_node_identity;
insert into sym_node_identity values ('master');

insert into sym_router (router_id,source_node_group_id,target_node_group_id,router_type,router_expression,sync_on_update,sync_on_insert,sync_on_delete,use_source_catalog_schema,create_time,last_update_by,last_update_time) 
 values ('server waits for pull from client','master','slaver','default',null,1,1,1,0,current_timestamp,'console',current_timestamp);
 
insert into sym_router (router_id,source_node_group_id,target_node_group_id,router_type,router_expression,sync_on_update,sync_on_insert,sync_on_delete,use_source_catalog_schema,create_time,last_update_by,last_update_time) 
 values ('client pushes to server','slaver','master','default',null,1,1,1,0,current_timestamp,'console',current_timestamp);
  