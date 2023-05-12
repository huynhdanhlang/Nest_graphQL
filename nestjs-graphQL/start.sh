#!/bin/bash
cd /usr/src/hasura/hasura || {
    echo "Hasura folder '/usr/src/hasura/hasura' not found"
    exit 1
}

# temporal fix to workaround: https://github.com/hasura/graphql-engine/issues/2824#issuecomment-801293056
socat TCP-LISTEN:8080,fork TCP:127.0.0.1:8080 &
socat TCP-LISTEN:9695,fork,reuseaddr,bind=svc_hasura_console TCP:127.0.0.1:9695 &
socat TCP-LISTEN:9693,fork,reuseaddr,bind=svc_hasura_console TCP:127.0.0.1:9693 &
{
    # Init hasura project
    hasura init hasura --endpoint http://127.0.0.1:8080/ --admin-secret $HASURA_GRAPHQL_ADMIN_SECRET
    # # Apply migrations
    # hasura migrate apply --database-name=default| exit 1
    if [ "$EUID" -ne 0 ]
        then 
            echo 'You are running with user permission'
            echo 'chown user hasura'
            sudo chown -R $USER:$USER hasura
        exit
    fi
    # # # Apply metadata changes
    # hasura metadata apply || exit 1

    # Run console if specified
    if [ $HASURA_RUN_CONSOLE ]; then
        echo "Starting console..."
        cd hasura
        hasura console --admin-secret $HASURA_GRAPHQL_ADMIN_SECRET --log-level DEBUG --address "127.0.0.1" --no-browser || exit 1
    else
        echo "Started without console"
        tail -f /dev/null
    fi
}