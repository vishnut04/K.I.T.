import psycopg2
# PostgresSQL Connection Paramaters
db_conn_params = {
    'dbname': 'postgres',
    'user': 'KIT_ADMIN',
    'password': 'hvz0rfb4BGQ_uqg3wfg',
    'host': 'kit-db.c9gssgcyk1lb.us-east-1.rds.amazonaws.com',
    'port': '5432'
}
# Retrieves all unprocessed videos from the database
def query_all_videos():
    # Connect to the PostgreSQL database
    conn = psycopg2.connect(**db_conn_params)

    # Create a cursor object
    cur = conn.cursor()

    # Execute the query
    cur.execute("SELECT * FROM videos")

    # Fetch all the rows
    rows = cur.fetchall()

    # Print the rows
    for row in rows:
        print(row)

    # Close the cursor and connection
    cur.close()
    conn.close()
# Deletes all videos from the tables
def delete_all_videos():
    # Connect to the PostgreSQL database
    conn = psycopg2.connect(**db_conn_params)

    # Create a cursor object
    cur = conn.cursor()

    # Execute the query
    cur.execute("DELETE FROM videos")

    # Commit the transaction
    conn.commit()

    # Close the cursor and connection
    cur.close()
    conn.close()

# Queries all videos marked as unprocessed
def query_unprocessed_videos():
    # Connect to the PostgreSQL database
    conn = psycopg2.connect(**db_conn_params)
    # Create a cursor object
    cur = conn.cursor()
    # Execute the query
    cur.execute("SELECT * FROM videos WHERE processed = false")
    # Fetch all the rows
    rows = cur.fetchall()
    # Print the rows
    for row in rows:
        print(row)
    # Close the cursor and connection
    cur.close()
    conn.close()
    
 #Queries all videos marked as processed
def query_processed_videos():
    # Connect to the PostgreSQL database
    conn = psycopg2.connect(**db_conn_params)
    # Create a cursor object
    cur = conn.cursor()
    # Execute the query
    cur.execute("SELECT * FROM videos WHERE processed = true")
    # Fetch all the rows
    rows = cur.fetchall()
    # Print the rows
    for row in rows:
        print(row)
    # Close the cursor and connection
    cur.close()
    conn.close()

    #Queries all frames from the database
def query_all_frames():
    # Connect to the PostgreSQL database
    conn = psycopg2.connect(**db_conn_params)
    # Create a cursor object
    cur = conn.cursor()
    # Execute the query
    cur.execute("SELECT * FROM frames")
    # Fetch all the rows
    rows = cur.fetchall()
    # Print the rows
    for row in rows:
        print(row)
    # Close the cursor and connection
    cur.close()
    conn.close()

    #Queries all unprocessed frames from the database   
def query_unprocessed_frames():
    # Connect to the PostgreSQL database
    conn = psycopg2.connect(**db_conn_params)
    # Create a cursor object
    cur = conn.cursor()
    # Execute the query
    cur.execute("SELECT * FROM frames WHERE processed = false")
    # Fetch all the rows
    rows = cur.fetchall()
    # Print the rows
    for row in rows:
        print(row)
    # Close the cursor and connection
    cur.close()
    conn.close()

    #Queries all processed frames from the database
def query_processed_frames():
    # Connect to the PostgreSQL database
    conn = psycopg2.connect(**db_conn_params)
    # Create a cursor object
    cur = conn.cursor()
    # Execute the query
    cur.execute("SELECT * FROM frames WHERE processed = true")
    # Fetch all the rows
    rows = cur.fetchall()
    # Print the rows
    for row in rows:
        print(row)
    # Close the cursor and connection
    cur.close()
    conn.close()
def delete_all_frames():
    # Connect to the PostgreSQL database
    conn = psycopg2.connect(**db_conn_params)

    # Create a cursor object
    cur = conn.cursor()

    # Execute the query
    cur.execute("DELETE FROM frames")

    # Commit the transaction
    conn.commit()

    # Close the cursor and connection
    cur.close()
    conn.close()

delete_all_frames()
delete_all_videos()
query_all_videos()
query_all_frames()

